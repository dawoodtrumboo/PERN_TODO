CREATE DATABASE todolist;

CREATE TABLE todo(
    todoId SERIAL PRIMARY KEY,
    description VARCHAR(255)
);