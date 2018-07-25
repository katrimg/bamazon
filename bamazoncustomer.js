var mysql = require("mysql");
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    inquirer.prompt([
        {
            type: "input ",
            name: "ID",
            message: "What is the item ID?",
        },
        {
            type: "input ",
            name: "quantity",
            message: "How many would you like to purchase?",
        }
    ]).then(function (inquirerResponse) {
        song(inquirerResponse.choice);
    });
    join();
});