const inquirer = require("inquirer");
// const logo = require("asciiart-logo");
const table=require("console.table");

// This file leads to a class we've created to contain all our database queries
const db = require("./db");


// Use this function to display the ascii art logo and to begin the main prompts
function init() {


  
}

// Here we load the initial prompts with a series of options. The first option is provided for you.

async function loadMainPrompts(){
  const questions= await inquirer
    .prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: 
      [
        {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
        },
        {
            name:'Add Employee',
            value:'ADD_EMPLOYEE',
        },
        {
            name:'Update Employee Role',
            value:'UPDATE_EMPLOYEE',
        },
        {
            name:'View All Roles',
            value:'VIEW_ROLES',
        },
        {
            name:'Add Role',
            value:'ADD_ROLE',
        },
        {
            name:'View All Departments',
            value:'VIEW_DEPARTMENTS',
        },
        {
            name:'Add Department',
            value:'ADD_DEPARTMENT',
        },
        {
            name:'Quit',
            value:'QUIT',
        },

        
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

      
        // add the other case statements here
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



/* ======= END Controllers ============================================================ */





/* 
  You will write lots of other functions here for the other prompt options.
  Note that some prompts will require you to provide more prompts, and these 
  may need functions of their own.
*/



// Everything starts here!
// init();
loadMainPrompts();