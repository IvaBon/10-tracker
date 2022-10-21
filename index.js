const inquirer=require("inquirer");
const { async } = require("rxjs");
const { getRole, connection } = require("./db");
const mysql=require('mysql2');


// const logo = require("asciiart-logo");
// const table=require("console.table");

// This file leads to a class we"ve created to contain all our database queries
const db = require("./db");



// Use this function to display the ascii art logo and to begin the main prompts

// Here we load the initial prompts with a series of options. The first option is provided for you.

function loadMainPrompts(){
   inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
        },
        {
            name:"Add Employee",
            value:"ADD_EMPLOYEES"
        },
        {
            name:"Update Employee Role",
            value:"UPDATE_EMPLOYEE"
        },
        {
            name:"View All Roles",
            value:"VIEW_ROLES"
        },
        {
            name:"Add Role",
            value:"ADD_ROLE"
        },
        {
            name:"View All Departments",
            value:"VIEW_DEPARTMENTS"
        },
        {
            name:"Add Department",
            value:"ADD_DEPARTMENT"
        },
        {
            name:"Quit",
            value:"QUIT"
        }

        
      ]
    }
  ])
  .then(res => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose
    
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_EMPLOYEES":
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE":
        updateEmployee();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "VIEW_DEPARTMENTS":
        viewDep();
        break;
      case "ADD_DEPARTMENT":
        addDep();
        break;
      case "QUIT":
        console.log('end')
        break;
    }
  }
)
}




/* ======= Controllers ============================================================ */

// Here is a function which handles the first prompt option:  View all employees
function viewEmployees() {

  // Here we call the method in the db file for finding all employees.
  // we get the result back, and then display the result 
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function addEmployee(){

  inquirer.prompt([
    {
      type:'input',
      name:'first_name',
      message:"What is the employee's first name",
    },
    {
      type:'input',
      name:'last_name',
      message:"What is the employee's last name",
    },
    {
      type:'number',
      name:'role',
      message:'What is role id for this employee',
    },
    {
      type:'number',
      name:'manager_id',
      message:'What is manager id for employee'
    }
  ])
  .then((resEmp)=>{
    db.makeEmployee(resEmp)
    console.log(`${resEmp.first_name} created`)
  }).then(() => loadMainPrompts());       

}


function updateEmployee(){
  inquirer.prompt([
    {
      type:'input',
      name:'firstName',
      message:"What is employee's first name"
    },
    {
      type:'input',
      name:'lastName',
      message:"What is employee's last name"
    },
    {
      type:'number',
      name:'role',
      message:'New role id'
    }
  ]).then((rup)=>{
    db.updateEmployee(rup)
    console.log(`Updated ${rup.firstName}`)
  }).then(() => loadMainPrompts());

}

function viewRoles(){
  db.findAllRoles()
  .then(([rows]) => {
    let employees = rows;
    console.log("\n");
    console.table(employees);
  })
  .then(() => loadMainPrompts());
}

function addRole(){
   inquirer.prompt([
      {
        type:'input',
        name:'title',
        message:'What is the name of the role',
      },
      {
        type:'number',
        name:'salary',
        message:'What is the salary of the role',
      },
      {
        type:'number',
        name:'department_id',
        message:'What is the department id'
      }
    ])
    .then((res)=>{
      db.makeRole(res)
      console.log(`${res.title} role created`)
    }).then(() => loadMainPrompts());       
}

function viewDep(){
  db.findAllDepartments()
  .then(([rows]) => {
    let employees = rows;
    console.log("\n");
    console.table(employees);
  })
  .then(() => loadMainPrompts());
}

function addDep(){
  inquirer.prompt([
    {
      type:'input',
      name:'addDepartment',
      message:'What is the name of the department'
    }
  ]).then((data)=>{
    db.makeDep(data)
    console.log(`Added ${data.addDepartment} to the database`)
  }).then(() => loadMainPrompts());
}


/* ======= END Controllers ============================================================ */


loadMainPrompts();