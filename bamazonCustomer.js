//short code that doesn't reuse multiple codes are best
//-----------------------------------------------------------------------
const inquirer = require('inquirer');
const mysql = require('mysql');
const Table = require('cli-table');
const color = require('colors');

    //populate is database with around 10 different products
    //(i.e insert 'mock' data rows int this data base and table).
//create a file call bamazoncustomer.js
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: 'bamazon'
});
//connecting to the database
connection.connect(function(err) {
    if(err) throw err;
    console.log(`connected as id ${connection.threadId}`);
});

//function to pull table from bamazon
function displayTable() {
    connection.query('select * FROM bamazon.products', function(err, res) {
    if (err) throw err;
    //var to store npm table 
    var productTable = new Table({
        head : ['Item ID', 'Item Name', 'Item Category', 'Price', 'Stock Quanity'],
        colWidths : [10,30,20,10,20] 
    });
    //loop to push items from response into table
    for (var i = 0; i < res.length; i++) {
        productTable.push(
            [res[i].item_id, res[i].itemName, res[i].itemCategory, res[i].price, res[i].stockQuantity]
        );
    };
        console.log(productTable.toString());
        bamazon();
    });
};
//function bamazon
function bamazon(){
    inquirer.prompt([
    {
        name: "choice",
        type: 'list',
        message: 'Here is our list of available Items at Bamazon'.red,
        choices :['shop with Bamazon','Show My Cart', 'exit']
    }
    ]).then(function(answer){      
        if(answer.choice === 'shop with Bamazon'){
        purchase();
        }else if(answer.choice === 'Show My Cart') {
            console.log('your car is emptty at the momment');
            //take this out later
            connection.end();
        }else{
        console.log('Have a Wonderful day');  
        connection.end();  
        process.exit();
        };
    });
};
//function to ask users for id and quanity.
function purchase() {
    inquirer.prompt([
    {
        name: 'id',
        type: 'input',
        message:'What is the Item ID that you would like to purchase?'.red
    }, {
        name: 'quantity',
        type: 'input',
        message: "How many of this product would you like to purchase?".red
    }
    ]).then(function(answer){
        var id = answer.id
        var quantity = answer.quantity
        //arguments to use for next function(thinking ahead);
        updateToBamazon(id,quantity);
        console.log('your order has been placed');
    });
};//end of purchase function

//function to take in answers from users and update it to bamazon database
function updateToBamazon(id, quantityPurchased) {
    //connecting to database and targeting item_id 
    connection.query('SELECT * FROM products WHERE item_id = ' + id, function(err,res){
        if (err) throw err;
        if(quantityPurchased <= res[0].stockQuantity){
            //var to store the total cost to display later
            var totalCost = parseInt(res[0].price) * parseInt(res[0].stockQuantity)
            console.log(`we have ${res[0].stockQuantity} of this items in stock`);
            console.log(`your total is ${totalCost} Dollars`);
            //need to update information to sql table and then display it with the upate data/.
            displayTable();
        }else{
            console.log("go away");
            displayTable();
        };
    });
    connection.query('update * from products where stock_quanity = ' + quantityPurchased, function(err,res){

    });
};
//calling function to run
displayTable();

    //running this application will first display all of the items
    //includes the ids, names, produts, and prices of products for sale.

//the app should prompt users with two messages.
    //the first prompt should ask them for the id of the product they would like to purchase
    //the second message should ask how many units of the products they would like to buy
//once the customer has placed the rder, your applucatuon should check if your store has enough of the products for the customer's request.
    //if not the app should log  phrase like 'insufficient quanity!'
    //then prevent the order form going in
//if the store does have enough product, you should fullfill the customer's oder.
    //this means updating the sql database to reflecg the remaining quanity.
    //once the updates goes through, show the customer the total cost of their purchse.
            