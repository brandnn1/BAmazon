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
    showItems();
  });
  
  function showItems() {
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
            message: "What product id would you like to buy?"
          },
          {
            name: "buy",
            type: "input",
            message: "How many would you like to buy?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.item) {
              chosenItem = results[i];
              console.table(chosenItem)
            }
          }
  
          // determine if there are enough items
          if (chosenItem.stock_quantity >= parseInt(answer.buy)) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: (chosenItem.stock_quantity - answer.buy),
                  product_sales: (chosenItem.product_sales + (chosenItem.price * answer.buy)),
                  units_sold: (chosenItem.units_sold + parseInt(answer.buy))
                },
                {
                  item_id: chosenItem.item_id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("You have successfully purchased " + answer.buy + " units!");
                console.log("There are currently " + (chosenItem.stock_quantity - answer.buy) + " units remaining" );
                showItems();
              }
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("Insufficient quantity!");
            showItems();
          }
        });
    });
  }









  // // function which prompts the user for what action they should take
  // function start() {
  //   inquirer
  //     .prompt({
  //       name: "postOrBid",
  //       type: "list",
  //       message: "Would you like to [POST] an auction or [BID] on an auction?",
  //       choices: ["POST", "BID", "EXIT"]
  //     })
  //     .then(function(answer) {
  //       // based on their answer, either call the bid or the post functions
  //       if (answer.postOrBid === "POST") {
  //         postAuction();
  //       }
  //       else if(answer.postOrBid === "BID") {
  //         bidAuction();
  //       } else{
  //         connection.end();
  //       }
  //     });
  // }
  