-- personal_info
INSERT INTO personal_info (name, title, description, years_experience, completed_projects, address, email, phone, availability)
VALUES (
    'MSKDevHub',
    'Junior Game Developer & IT Undergraduate',
    'I am from Pakistan. I have experience in Programming and I''m skilled in O3DE using C++ with Blender . I love discussing what makes us unique.',
    '3+',
    '5',
    'North Tower, Toronto, Canada',
    'mskreallabs@gmail.com',
    '+92 311 5635536',
    'Available Right Now'
);

-- social_links
INSERT INTO social_links (platform, url) VALUES ('LinkedIn', 'https://www.linkedin.com/in/mskreallabs/');
INSERT INTO social_links (platform, url) VALUES ('GitHub', 'https://github.com/MSKRealLabs');
INSERT INTO social_links (platform, url) VALUES ('YouTube', 'https://www.youtube.com/@MSKRealLabs');
INSERT INTO social_links (platform, url) VALUES ('Facebook', 'https://www.facebook.com/mskreallabs');
INSERT INTO social_links (platform, url) VALUES ('Instagram', 'https://www.instagram.com/mskreallabs/');
INSERT INTO social_links (platform, url) VALUES ('TikTok', 'https://www.tiktok.com/@mskreallabs');

-- services
INSERT INTO services (subtitle, title, description) VALUES ('Advanced Game Development', 'C++ and Open3D Engine (O3DE)', 'High-fidelity 3D asset modeling and rigging (Blender), custom shader development, game security analysis, and full-cycle development for Android/iOS');
INSERT INTO services (subtitle, title, description) VALUES ('Software & App Engineering', 'Cross-platform application architecture', 'Development of mobile-ready software applications with a focus on optimization and user experience (UX) design');
INSERT INTO services (subtitle, title, description) VALUES ('Web Development & Digital Branding', 'Full-stack web layout and architectural planning', 'Custom website development, responsive web design, and professional logo/identity creation for companies, startups, and personal brands');
INSERT INTO services (subtitle, title, description) VALUES ('Strategic Advertising', 'Google Ads ecosystem', 'Targeted advertising across Google Search, Gmail, and YouTube to reach your specific audience demographic efficiently');
INSERT INTO services (subtitle, title, description) VALUES ('Audio Composition & Sound Design', 'Creative sound engineering', 'Original soundtrack creation, music transcription, and custom audio composition tailored for game environments or multimedia projects');

-- skills
INSERT INTO skills (name, percentage, description) VALUES ('C++', 85, 'skill paragraphLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
INSERT INTO skills (name, percentage, description) VALUES ('C++', 85, 'skill paragraphLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
INSERT INTO skills (name, percentage, description) VALUES ('C++', 85, 'skill paragraphLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
INSERT INTO skills (name, percentage, description) VALUES ('C++', 60, 'skill paragraphLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
INSERT INTO skills (name, percentage, description) VALUES ('C++', 70, 'skill paragraphLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');

-- portfolio
INSERT INTO portfolio (category, title, description, image_url) VALUES ('Branding', 'custom market', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', 'assets/img/project1.webp');
INSERT INTO portfolio (category, title, description, image_url) VALUES ('Branding', 'custom market', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', 'assets/img/project2.webp');
INSERT INTO portfolio (category, title, description, image_url) VALUES ('Branding', 'custom market', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', 'assets/img/project3.webp');
INSERT INTO portfolio (category, title, description, image_url) VALUES ('Branding', 'custom market', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', 'assets/img/project4.webp');
INSERT INTO portfolio (category, title, description, image_url) VALUES ('Branding', 'custom market', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', 'assets/img/project5.webp');
INSERT INTO portfolio (category, title, description, image_url) VALUES ('Branding', 'custom market', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', 'assets/img/project6.webp');

-- store
INSERT INTO store (category, title, description, price, image_url) VALUES ('3D Assets', 'Custom Asset', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', '$15', 'assets/img/project1.webp');
INSERT INTO store (category, title, description, price, image_url) VALUES ('3D Assets', 'Custom Asset', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', '$20', 'assets/img/project2.webp');
INSERT INTO store (category, title, description, price, image_url) VALUES ('Templates', 'Custom Asset', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', '$30', 'assets/img/project3.webp');
INSERT INTO store (category, title, description, price, image_url) VALUES ('Plugins', 'Custom Asset', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', '$40', 'assets/img/project4.webp');
INSERT INTO store (category, title, description, price, image_url) VALUES ('3D Assets', 'Custom Asset', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', '$15', 'assets/img/project5.webp');
INSERT INTO store (category, title, description, price, image_url) VALUES ('Plugins', 'Custom Asset', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis aliquam rem ea fugit voluptate voluptas. Unde vero tempore, magni nemo repudiandae sint est ut repellat in provident, quod nam!', '$25', 'assets/img/project6.webp');

-- resume (Education)
INSERT INTO resume (section, organization, role, date_range, description) VALUES ('Education', 'CoderHouse Courses', 'Backend Programming', '2014 - 2016', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga non maxime amet, repellat soluta vero ipsum excepturi laboriosam ut doloribus?.');
INSERT INTO resume (section, organization, role, date_range, description) VALUES ('Education', 'Lviv National Academy of Arts', 'Faculty of Design', '2012 - 2014', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, quidem amet corporis minus beatae alias nam suscipit molestias ipsum earum!');
INSERT INTO resume (section, organization, role, date_range, description) VALUES ('Education', 'IT Future', 'High School', '2010 - 2012', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti id nostrum eos est corporis odit asperiores nulla quod deleniti sed.');

-- resume (Experience)
INSERT INTO resume (section, organization, role, date_range, description) VALUES ('Experience', 'Soft Tech Inc.', 'UI Head & Manager', '2020 - Present', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, fugit ipsum. Eius quos numquam sequi quia fuga quam fugit perferendis?');
INSERT INTO resume (section, organization, role, date_range, description) VALUES ('Experience', 'Kana Design Studio', 'UI / UX Specialist', '2018 - 2020', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto repudiandae ut sit beatae debitis autem cupiditate porro, nesciunt optio dignissimos?');
INSERT INTO resume (section, organization, role, date_range, description) VALUES ('Experience', 'Fiverr.com', 'Plugins Developer', '2016 - 2018', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam ipsum nisi eos facere id iure quo eius ex, maxime modi.');

-- testimonials
INSERT INTO testimonials (author, role, feedback, image_url) VALUES ('Paul Freeman', 'Photographer', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut repellat ratione quaerat doloremque nemo minima nostrum inventore quas similique sed.', 'assets/img/testimonial1.webp');
INSERT INTO testimonials (author, role, feedback, image_url) VALUES ('Barbara Wilson', 'CEO Company', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut repellat ratione quaerat doloremque nemo minima nostrum inventore quas similique sed.', 'assets/img/testimonial3.webp');
INSERT INTO testimonials (author, role, feedback, image_url) VALUES ('Charlie Smith', 'Designer', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut repellat ratione quaerat doloremque nemo minima nostrum inventore quas similique sed.', 'assets/img/testimonial4.webp');
INSERT INTO testimonials (author, role, feedback, image_url) VALUES ('Roy Wang', 'Manager GYM', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut repellat ratione quaerat doloremque nemo minima nostrum inventore quas similique sed.', 'assets/img/testimonial1.webp');
INSERT INTO testimonials (author, role, feedback, image_url) VALUES ('Jennifer Smith', 'CEO & Founder', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut repellat ratione quaerat doloremque nemo minima nostrum inventore quas similique sed.', 'assets/img/testimonial1.webp');
