const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;   // here we reach out to the db so we can do a query
  }

  // Find all employees
  // THIS IS NOT THE FINAL QUERY. YOU WILL NEED TO MODIFY THIS QUERY SO THAT YOU JOIN 
  // THE EMPLOYEES WITH THEIR ROLES, SALARIES, DEPARTMENTS, AND MANAGERS
  // HINT: A TABLE CAN BE JOINED ON ITSELF WITH PROPER TABLE ALIASING
  
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT * FROM employee JOIN role ON employee.role_id=role.id JOIN department ON role.department_id=department.id;"
    );
  }

  findAllDepartments(){
    return this.connection.promise().query(
      "SELECT * FROM employees_db.department;"
    );
  }

 

  findAllRoles(){
    return this.connection.promise().query(
      "SELECT * FROM employees_db.role;"
    );
  }

  makeDep(data){

    return this.connection.promise().query(
      "INSERT INTO department (name) VALUES (?);",data.addDepartment)
      
  }

  makeRole(res){
    return this.connection.promise().query(
      "INSERT INTO role (title,salary,department_id) VALUES (?,?,?);",[res.title, res.salary, res.department_id]
      );
  }

  makeEmployee(resEmp){
    return this.connection.promise().query(
      "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?);",[resEmp.first_name, resEmp.last_name, resEmp.role, resEmp.manager_id]
    );
  }

  updateEmployee(rup){
    return this.connection.promise().query(
      "UPDATE employee SET role_id=? WHERE first_name=? AND last_name=?;",[rup.firstName, rup.lastName, rup.role]
    );
  }

  

  // Add more class methods below for all the database operations needed.
  // Sometimes you may need to pass an id value into a method so it knows 
  //   how to find the correct record.


  
}




module.exports = new DB(connection);