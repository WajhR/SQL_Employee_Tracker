USE employeetracker_db;

INSERT INTO department (dep_name) 
VALUES  ("IT"), 
        ("HR"), 
        ("Sales"),
        ("Accounting"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("CFO", 176000, 4),
        ("Legal Council", 134000, 5),
        ("Account Manager", 134000, 4),
        ("HR Business Partner", 129000, 2),
        ("Accountant", 125000.00, 1),
        ("Lead Engineer", 115000.00, 1),
        ("Sales Manager", 105000, 3),
        ("Sales Lead", 90000, 3),
        ("Legal Assistant", 85000, 3),
        ("Junior Engineer",65000, 1 ),
        ("HR Admin", 52000, 2),
        ("Market Research Associate", 47000, 3),
        ("Social Media Assistant", 45000, 3);

       
       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Mike", "Chan", 1, 1),
        ("Kevin", "Tupik", 2, 1),
        ("Tom", "Allen", 3, 3),
        ("Edward", "Cullen", 4, 3),
        ("Sarah", "Lourd", 5, 5),
        ("Erin", "Diamond", 6, 5),
        ("Brian", "Griffin", 7, 2),
        ("Josh", "Huckabee", 8, 5),
        ("Lourdes", "Caputo", 9, 1),
        ("Karim", "Jabbar", 10, 2),
        ("Neil", "Jackson", 11, 3),
        ("Betty", "Johnson", 12, 1),
        ("Sam", "Adams", 13, 4);
        




