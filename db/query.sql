SELECT 
FROM employee
JOIN  employee ON employee_name.department = department.id;
    employee.id,
    employee.first_name,
    employee.last_name,
    CONCAT (manager.first_name,'', manager,last_name) AS 
    manager_name
    FROM employee
    JOIN employee AS manager ON employee.manager_id = manager.id;