import { Hono } from 'hono'

const app = new Hono()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function cleanStr(value, maxLength) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function base64url(input) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : input
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function signJWT(payload, secret) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = base64url(JSON.stringify(payload))
  const data = `${header}.${body}`
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return `${data}.${base64url(new Uint8Array(signature))}`
}

function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return result === 0
}

async function readJson(c) {
  try {
    const data = await c.req.json()
    if (!data || typeof data !== 'object' || Array.isArray(data)) return { ok: false }
    return { ok: true, data }
  } catch {
    return { ok: false }
  }
}

async function hashPassword(password, saltString) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  const saltBuffer = new Uint8Array(saltString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const exportedKey = await crypto.subtle.exportKey("raw", key);
  const hashArray = Array.from(new Uint8Array(exportedKey));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt() {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
}

// 1. API: Contact
app.post('/api/contact', async (c) => {
  try {
    const { ok: bodyOk, data } = await readJson(c);
    if (!bodyOk) return c.json({ error: "Invalid JSON body" }, 400);
    const name = cleanStr(data.name, 100);
    const email = cleanStr(data.email, 254);
    const subject = cleanStr(data.subject, 150);
    const message = cleanStr(data.message, 5000);

    if (!name || !email || !subject || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    if (!EMAIL_RE.test(email)) {
      return c.json({ error: "Invalid email address" }, 400);
    }

    const { success } = await c.env.DB.prepare(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)"
    ).bind(name, email, subject, message).run();

    if (success) {
      return c.json({ success: true, message: "Message saved to database" }, 200);
    }
    throw new Error("Failed to insert into database");
  } catch (err) {
    console.error('Contact endpoint error:', err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// 2. API: Auth Login
app.post('/api/auth/login', async (c) => {
  try {
    const { ok: bodyOk, data } = await readJson(c);
    if (!bodyOk) return c.json({ error: "Invalid JSON body" }, 400);
    const email = cleanStr(data.email, 254);
    const password = typeof data.password === 'string' ? data.password : '';

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const secret = c.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not configured');
      return c.json({ error: "Server configuration error" }, 500);
    }

    const user = await c.env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
    if (!user) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    const hash = await hashPassword(password, user.salt);

    if (timingSafeEqual(hash, user.password_hash)) {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
      };
      const token = await signJWT(payload, secret);

      c.header("Set-Cookie", `auth_token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=86400`);
      return c.json({ success: true, message: "Login successful!", name: user.name }, 200);
    }
    return c.json({ error: "Invalid email or password" }, 401);
  } catch (err) {
    console.error('Login endpoint error:', err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// 3. API: Auth Signup
app.post('/api/auth/signup', async (c) => {
  try {
    const { ok: bodyOk, data } = await readJson(c);
    if (!bodyOk) return c.json({ error: "Invalid JSON body" }, 400);
    const name = cleanStr(data.name, 100);
    const email = cleanStr(data.email, 254);
    const password = typeof data.password === 'string' ? data.password : '';

    if (!name || !email || !password) {
      return c.json({ error: "Name, email, and password are required" }, 400);
    }

    if (!EMAIL_RE.test(email)) {
      return c.json({ error: "Invalid email address" }, 400);
    }

    if (password.length < 8) {
      return c.json({ error: "Password must be at least 8 characters" }, 400);
    }

    const existing = await c.env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
    if (existing) {
      return c.json({ error: "User already exists" }, 400);
    }

    const salt = generateSalt();
    const hash = await hashPassword(password, salt);

    const { success } = await c.env.DB.prepare(
      "INSERT INTO users (name, email, password_hash, salt) VALUES (?, ?, ?, ?)"
    ).bind(name, email, hash, salt).run();

    if (success) {
      return c.json({ success: true, message: "Account created successfully" }, 200);
    }
    throw new Error("Failed to create account");
  } catch (err) {
    console.error('Signup endpoint error:', err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Fallback for static assets in Cloudflare Pages
app.all('*', (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
