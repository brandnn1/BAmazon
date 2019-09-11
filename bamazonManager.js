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
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product","Exit"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.userChoice === "View Products for Sale") {
          viewProducts();
        }
        else if(answer.userChoice === "View Low Inventory") {
          viewLowInventory();
        } 
        else if(answer.userChoice === "Add to Inventory") {
            addInventory();
          } 
          else if(answer.userChoice === "Add New Product") {
            addNewProduct();
          } 
            
        else{
          connection.end();
        }
      });
  }

  function viewProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }

  function viewLowInventory() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products where stock_quantity < 5", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }

  function addInventory() {
      
  }