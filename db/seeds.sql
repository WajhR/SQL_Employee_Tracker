USE employeetracker_db;

INSERT INTO department (name) VALUES ("IT"), ("HR"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ( "Sales Lead", 80000.00, 3),
        ("Salesperson", 65000.00, 3),
       ("Lead Engineer", 105000.00, 1),
       ("Accountant", 125000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 1, NULL),
        ("Kevin", "Tupik", 2, 1),
        ("Tom", "Allen", 3, NULL),
        ("Sarah", "Lourd", 4, NULL);




