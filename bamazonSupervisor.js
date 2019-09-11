var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "FloatingUnicornHorns",
  database: "bamazon"
});



// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    startPrompt();
  });

  function startPrompt() {
    inquirer
      .prompt({
        name: "userChoice",
        type: "list",
        message: "Would you like to [View Products for Sale]? [View Low Inventory]? [Add items to Inventory]? [Add a New Product]? Or [Exit]",
        choices: ["View Product Sales by Department", "Create New Department","Exit"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.userChoice === "View Product Sales by Department") {
          viewDeptSales();
        }
        else if(answer.userChoice === "Create New Department") {
          createDept();
        }             
        else{
          connection.end();
        }
      });
  }