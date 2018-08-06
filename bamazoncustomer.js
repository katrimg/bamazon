//require mysql and inquirer
var mysql = require("mysql");
var inquirer = require('inquirer');

//creating the connection to the database called bamazon
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayInventory();
  });

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
   

    // query string for all products
    queryStr = 'SELECT * FROM products';

    // Make the db query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Inventory: ');

        var strOut = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + data[i].item_id + '  //  ';
            strOut += 'Product: ' + data[i].product_name + '  //  ';
            strOut += 'Department: ' + data[i].department_name + '  //  ';
            strOut += 'Quantity Available: ' + data[i].stock_quantity + '  //  ';
            strOut += 'Price: $' + data[i].price + '\n';

            console.log(strOut);
        }

        //run makePurchase after the inventory is desplayed
        makePurchase();
    })
}

function makePurchase() {

    // prompt users with two questions:
    inquirer.prompt([
        {
            type: "input ",
            name: "ID", 
            // ask them the ID of the product they would like to buy
            message: "What is the item ID?",
        },
        {
            type: "input ",
            name: "quantity",
            // ask how many units of the product they would like to buy
            message: "How many would you like to purchase?",
        }
    ]).then(function (input) {

        //create variables for itemId and quantity
        var itemId = input.item_id
        var quantity = input.stock_quantity
        purchaseItem(itemId, quantity);
    });

    function purchaseItem(itemId, quantity){
        var queryStr = 'SELECT * FROM products WHERE ?';

        //see if the item id entered matches one in the database 
        connection.query(queryStr, { item_id: itemId }, function (err, data) {
            if (err) throw err;

            // if they don't match then console log invalid
            if (data.length === 0) {
                console.log('Invalid item id');
                console.log(data);

                //otherwise, create a variable to hold the data
            } else {
                var pData = data[0];
               

                // if the quanity entered is less than that items stock quantity, then  
                if (quantity < pData.stock_quantity) {
                    console.log('Your product is in stock. Placing your order now.');


                    // create variable that updates the stock quanity in database to reflect new quantity for specific item
                    var updateQuery = 'UPDATE products SET stock_quantity = ' + (pData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                    console.log('updateQueryStr = ' + updateQueryStr);

                    // connect to database and update it 
                    connection.query(updateQuery, function (err, data) {
                        if (err) throw err;

                        // show the customer the total cost of their purchase
                        console.log('Your total is $' + pData.price * quantity);

                        // End the database connection
                        connection.end();
                    })
                } else {

                    // If not, log phrase `Insufficient quantity!`
                    console.log('Insufficient quantity');
                    displayInventory();
                }
            }
        })

    
    };
}




