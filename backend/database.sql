CREATE DATABASE noteodo_db;

CREATE TABLE users (
     user_id serial PRIMARY KEY, 
     username VARCHAR(50) UNIQUE NOT NULL,
     password VARCHAR(500) NOT NULL, 
     email VARCHAR(200) UNIQUE NOT NULL, 
     animal VARCHAR(10) NOT NULL,
     created_on TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE pages (
     page_id serial,
     title VARCHAR(200) NOT NULL,
     notes TEXT,
     pinned BOOLEAN DEFAULT FALSE, 
     created_on TIMESTAMP DEFAULT current_timestamp,
     user_id INTEGER REFERENCES users(user_id)
);