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
      console.table(res);
      connection.end();
    });
  }

  function viewLowInventory() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products where stock_quantity <= 5", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
  }

  function addInventory() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "item",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
              }
              return choiceArray;
            },
            message: "What product would you like to add inventory to?"
          },
          {
            name: "add",
            type: "input",
            message: "How many items would you like to add to the inventory?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.item) {
              chosenItem = results[i];
              console.table(chosenItem)
              Update()
            }
          }
  
          // determine if there are enough items
          function Update(){
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: (chosenItem.stock_quantity + parseInt(answer.add))
                },
                {
                  item_id: chosenItem.item_id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("You have successfully added " + answer.add + " units!");
                console.log("There are currently " + (chosenItem.stock_quantity + parseInt(answer.add)) + " units remaining" );
                connection.end();
              }
            );
          }
        });
    });
  }

  function addNewProduct() {
    connection.query("SELECT distinct department_name FROM departments where department_name IS NOT NULL", function(err, results) {
        if (err) throw err;
      inquirer
        .prompt([
          {
            name: "productName",
            type: "input",
            message: "What is the name of the product you'd like to add?"
          },
          {
            name: "deptName",
            type: "rawlist",
            message: "What department does this product belong in?",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].department_name);
                }
                return choiceArray;
              }
          },
          {
            name: "price",
            type: "input",
            message: "What price would you like to set?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
          },
          {
            name: "stockQuant",
            type: "input",
            message: "How many units do you want to set for this product?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
          }
        ])
        .then(function(answer) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
              "INSERT INTO products  SET ?",
              [
                {
                  product_name: answer.productName,
                  department_name: answer.deptName,
                  price: answer.price,
                  stock_quantity: answer.stockQuant
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("You have successfully added " + answer.productName + " to the database!");
                connection.end();
              }
            );
          }
        )}
    )};