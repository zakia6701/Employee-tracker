const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123root.",
  database: "employees_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("MySQL Connected");
  menu();
});

const menu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choices",
        choices: [
          "View all Employees",
          "View all Roles",
          "View all Departments",
          "Add new Employee",
          "Add new Role",
          "Add new Department",
          "Update an employee",
        ],
      },
    ])
    .then((res) => {
      if (res.choices === "View all Employees") {
        viewAllEmployees();
      }
      if (res.choices === "View all Roles") {
        viewAllRoles();
      }
      if (res.choices === "View all Departments") {
        viewAllDepartments();
      }
      if (res.choices === "Add new Employee") {
        addNewEmployee();
      }
      if (res.choices === "Add new Role") {
        addNewRole();
      }
      if (res.choices === "Add new Department") {
        addNewDepartment();
      }
      if(res.choices === "Update an employee") {
          updateEmployeeRole()
      }
    });
};

// VIEW
// View all employees
const viewAllEmployees = () => {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
};
// View all roles
const viewAllRoles = () => {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
};
// View all departments
const viewAllDepartments = () => {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
};

// ADD
// Add new employee
const addNewEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "What is this employees first name?",
      },
      {
        type: "input",
        name: "last",
        message: "What is this employees last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is this employees role ID?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is this employees managers ID?",
      },
    ])
    .then((res) => {
      db.query("INSERT INTO employee SET ?", {
        first_name: res.first,
        last_name: res.last,
        role_id: res.roleId,
        manager_id: res.managerId,
      });
      console.log(`${res.first} added to your employee table`);
      menu();
    });
};

const addNewRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "job_title",
        message: "What is this New role?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is this roles department ID?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
    ])
    .then((res) => {
      db.query("INSERT INTO roles SET ?", {
        job_title: res.job_title,
        department_id: res.department_id,
        salary: res.salary,
      });
      console.log(`${res.job_title} added to your roles table`);
      menu();
    });
};

const addNewDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is this departments name?",
      },
    ])
    .then((res) => {
      db.query("INSERT INTO department SET ?", {
        department_name: res.department_name,
      });
      console.log(`${res.department_name} added to your department table`);
      menu();
    });
};

const updateEmployeeRole = () => {
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;

        const employeeNames = data.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));

        inquirer.prompt([{
            type: "list",
            name: "empName",
            message: "Who's role would you like to update?",
            choices: employeeNames
        }]).then((res) => {
            const employee = res.empName;
            const values = []
            values.push(employee)

            db.query("SELECT * FROM roles", (err, data) => {
                if (err) throw err;

                const roleNames = data.map(({ id, job_title }) => ({ name: job_title, value: id }));

                inquirer.prompt({
                    type: "list",
                    name: "roleName",
                    message: `Which role is this employee getting put into?`,
                    choices: roleNames
                }).then((res) => {
                    const role = res.roleName;
                    values.push(role)

                    let employee = values[0]
                    values[0] = role;
                    values[1] = employee

                    db.query("UPDATE employee SET role_id = ? where id = ?", values, (err, res) => {
                        if (err) throw err;
                        console.log("Employee's role has been updated")
                        menu()
                    })
                })

            })
        })
    })
} 