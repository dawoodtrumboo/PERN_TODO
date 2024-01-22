CREATE DATABASE todolist;

CREATE TABLE todo(
    todoId SERIAL PRIMARY KEY,
    description VARCHAR(255)
    iscompleted BOOLEAN DEFAULT false;
);