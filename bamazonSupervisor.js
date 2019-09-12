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
connection.connect(function (err) {
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
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.userChoice === "View Product Sales by Department") {
                viewDeptSales();
            }
            else if (answer.userChoice === "Create New Department") {
                createDept();
            }
            else {
                connection.end();
            }
        });
}

function viewDeptSales() {
    console.log("Selecting all departments...\n");
    connection.query("select distinct d.department_id as 'Department ID',d.department_name as 'Department Name', sum(p.stock_quantity) as 'Stock Quantity', d.over_head_costs as 'Overhead Cost', sum(p.units_sold) as 'Total Units Sold',sum(p.product_sales) as 'Total Product Sales', (sum(p.product_sales) - d.over_head_costs) as 'Total Profit'from bamazon.departments d left join bamazon.products p on p.department_name = d.department_name group by p.department_name;"
        , function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
            connection.end();
        });
}

function createDept() {
    inquirer
        .prompt([
            {
                name: "deptName",
                type: "input",
                message: "What is the name of the department you'd like to add?"
            },
            {
                name: "overHead",
                type: "input",
                message: "How much over head do you want to apply to this department?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            console.log(answer)
            //check if department exists
            var checkOut = '';
            connection.query("SELECT department_name FROM departments", function (err, results) {
                for (var i = 0; i < results.length; i++) {
                    if (results[i].department_name === answer.deptName) {
                        checkOut = 1
                    }
                }

                if (checkOut !== 1) {
                    console.log(checkOut)
                    connection.query(
                        "INSERT INTO departments  SET ?",
                        [
                            {
                                department_name: answer.deptName,
                                over_head_costs: answer.overHead
                            }
                        ],
                        function (error) {
                            if (error) throw (err);
                            console.log("You have successfully added " + answer.deptName + " to the database!");
                            connection.end();
                        }
                    );
                } else {
                    console.log("Department Already in Database!")
                    connection.end();
                }
            });
        })
};
