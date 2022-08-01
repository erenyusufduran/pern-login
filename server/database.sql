CREATE DATABASE pernlogin;

--set extension 
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(30) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--inster fake users
INSERT INTO users(user_name,user_email,user_password) VALUES ('Eren', 'erney@gmail.com', '123456');