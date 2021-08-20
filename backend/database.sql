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
     page_id serial PRIMARY KEY,
     title VARCHAR(200) NOT NULL,
     notes TEXT,
     pinned BOOLEAN DEFAULT FALSE, 
     created_on TIMESTAMP DEFAULT current_timestamp,
     user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE todoitems (
     todoitem_id serial PRIMARY KEY, 
     todotext TEXT, 
     checked BOOLEAN DEFAULT FALSE,
     created_on TIMESTAMP DEFAULT current_timestamp,
     todolist_id INTEGER REFERENCES todolist(todolist_id)
);

CREATE TYPE todo_list_tag as enum('OVERVIEW', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

CREATE TABLE todolist (
     todolist_id serial PRIMARY KEY,
     title VARCHAR(300) NOT NULL,
     tag todo_list_tag,
     group_id VARCHAR(30)
);

CREATE TABLE spreads (
     spread_id serial PRIMARY KEY,
     title VARCHAR(300),
     week_title VARCHAR(10),
     notes TEXT,
     group_id VARCHAR(30),
     created_on TIMESTAMP DEFAULT current_timestamp,
     user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE overview (
     overview_id serial PRIMARY KEY,
     title VARCHAR(300),
     notes TEXT,
     todolist_id INTEGER REFERENCES todolist(todolist_id),
     user_id INTEGER REFERENCES users(user_id)
);