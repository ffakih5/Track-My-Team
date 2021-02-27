USE team_db;

INSERT INTO department (department_name)
VALUES
('Engineering'),
('Finance'),
('Human Resources'),
('Legal'),
('Marketing'),
('Security');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Software Engineer', 90000, 1),
('Accountant', 72000, 2),
('Manager', 75000, 3),
('Legal Counsel', 80000, 4),
('Brand Strategist', 60000, 5),
('Cyber Analyst', 90000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Yvie', 'Stone', 1, 157),
('Raynor', 'Phelps', 2, 248),
('Alegra', 'Jones', 3, 339),
('Lionel', 'Moutif', 4, 421),
('Shilo', 'Vistek', 5, 512),
('Priya', 'Hanar', 6, 603);

