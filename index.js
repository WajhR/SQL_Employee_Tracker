// import inquirer
const inquirer = require('inquirer');

const db = require('./db/connection');
// import console.table
require('console.table');

require('dotenv').config();

startApp =()=> {
    console.log("******************************");
    console.log("******************************");
    console.log("*****  EMPLOYEE TRACKER  *****");
    console.log("******************************");
    console.log("******************************");
    promptUser();
};

const promptUser = ()=> {
    inquirer.prompt([
        {
            name: 'option',
            message: 'What would you like to do?',
            type: 'list',
            choices: [
            'View all Departments',
            'View All Roles',
            'View All Employees',
            'Add New Departments',
            'Add New Employee',
            'Add New Role',
            'Update an Employee Role',
            'Exit'
            ],
        },
    ]).then (choices => {
        switch (choices.option){
            case "View all Departments":
                // called below
                viewAllDepartments()
                break;
            case "View All Roles":
                // called below
                viewAllRoles()
                break;
            case "View All Employees":
                // called below
                viewAllEmployees()
                break;
            case "Add New Departments":
                    // called below
                addDepartment()
                break;
            case "Add New Role":
                addRole()
                break;
            case "Add New Employee":
                // called below
                addEmployee()
                break;
            case "Update an Employee Role":
                updateRole()
                break;
            case "Exit":
                console.log ("Thank you for using our employee tracker app. Have a great day!");
                process.exit();
        }
    })
};
            
// function for view all departments
const viewAllDepartments = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) 
            throw err;
        console.table(res)
        promptUser();
    })
}
// view all roles needs selecting from role table
const viewAllRoles = () => {
    db.query(`SELECT role.id, role.title, department.dep_name, role.salary AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id`
    , (err, res) => {
        if (err)
            throw err;
        console.table(res)
        promptUser();
    })
}

// view all employees from employees table 
const viewAllEmployees = () => {
    db.query(`SELECT employee.id, 
                employee.first_name, 
                employee.last_name, 
                role.title, 
                department.dep_name AS department,
                role.salary, 
             CONCAT (employee.first_name, " ", employee.last_name) AS manager
            FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`
    
    , (err, res) => {
        if (err)
            throw err;
        console.table(res)
        promptUser();
    })
}


const addDepartment = () => {
        inquirer.prompt(
            {
                type: "input",
                name: "department",
                message: "Insert new department",
            })
        .then(res => {
            db.query("INSERT INTO department SET ?",
            {
                dep_name: res.department
            },
            (err, res) => {
                if (err)
                throw err;
            console.log (`Department added! Select "view all departments" to see addition.`);
            promptUser();
            })
        })
    }


// add role need to first select query from department
const addRole = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err)
        throw err;

        inquirer.prompt([
            {
            type: "input",
            name: "role",
            message: "Insert the name of the new role (required)",
            },
            {
            type: "input",
            name: "salary",
            message: "What is this role's salary (required)",
            },
            {
            type: "list",
            name: "depID",
            message: "Please select the Department ID (required)",
            choices:
            // takes all of the values from department and returns 
                res.map(department => department.dep_name)
            }
        ]) .then(data => {
            // returns name of the department depID.id (comes from integer created from table creation)
            const depID = res.find(department => department.dep_name === data.depID)
            db.query("INSERT INTO role SET ?", {
                title: data.role, salary: data.salary, department_id: depID.id
            }, 
            err => {
                if (err) 
                throw err;
                    
            console.log(`Role successfully added. Select "view all roles" to see addition`)
            promptUser(); 
        }
            ) 
        })
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Insert the new employee's first name (required)"
        },
        {
            type: "input",
            name: "lastName",
            message: "Insert the new employee's last name (required)"
        },
        {
            type: "input",
            name: "roleID",
            message: "Insert the new employee's role ID (required)"
        },
        {
            type: "input",
            name: "managerID",
            message: "Insert ID of employee's new manager (required)"
        }
    ])
    .then(res => {
        db.query("INSERT INTO employees SET ?",
        {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.roleID,
            manager_id: res.managerID,
        },
        (err, res) => {
            if (err)
            throw err;
            console.log(`New Employee added! Select "view all employees" to see addition.`);
            promptUser();
        })
    })
}

const updateRole = () => {
db.query(`SELECT CONCAT(employee.first_name, " ", employee.last_name) AS Employee_Name FROM employee;`,
    function (err, res) {
        if (err) 
        throw err;
        // loop to go through names and push to array for selection
        for (let i = 0; i < res.length; i++) {
            let name = res[i].Employee_Name;
            names.push(name);
        }

        inquirer.prompt([
            {
                type: "list",
                name: "selectedEmp",
                message: "Which employee's role would you like to update?",
                choices: names
            }
        ])
        .then((res) => {
            let employee = res.selectedEmp;

            db.query(`SELECT role.title AS R FROM role`,
                function (err, res) {
                    if (err)
                    throw err;
                    // loop to go through rolls and push to array for selection 
                    for (let i = 0; i < res.length; i++) {
                        let role = res[i].Role_Title;
                        roles.push(role);
                }
            
            inquirer.prompt([
                {
                    type: "list",
                    name: "roleUpdate",
                    message: "What is the new role for this employee?",
                    choices: roles
                }
            ])

            .then((res) => {
                let roleName = res.roleUpdate;
                console.log('selected role:', roleName);
                db.query(`UPDATE employees SET ? WHERE CONCAT(employees.first_name,' ', employees.last_name) = '${employee}'; `,
                {
                    role_id: roles.indexOf(roleName) + 1
                },

                (err, res) => {
                    if (err) throw err;
                    console.log(`Employee role updated!`);
                    promptUser();
                });
            });
        });
    });
});
};


startApp();

// inquirer.query(sql, (err) => {
//     if (err) throw err;

//     console.log('Table created successfullly');
// });