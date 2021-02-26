DROP DATABASE IF EXISTS team_db;

CREATE DATABASE team_db;

USE team_db;

CREATE TABLE department (
id INT AUTO_INCREMENT,
department_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
); 

CREATE TABLE roles (
id INT AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DEC(10,3),
department_id INT,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT, 
PRIMARY KEY (id)
);

