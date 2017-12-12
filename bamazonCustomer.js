//short code that doesn't reuse multiple codes are best
//-----------------------------------------------------------------------
var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('cli-table');
var color = require('colors');

    //populate is database with around 10 different products
    //(i.e insert 'mock' data rows int this data base and table).
//create a file call bamazoncustomer.js
var connection = mysql.createConnection({
    user: 'root',
    password: "",
    database: 'bamazonDB'
});

connection.connect(function(err) {
    if(err) throw err;
    console.log(`connected as id ${connection.threadId}`)
})

function connectToBamazon() {
    connection.query('select FROM bamazon_tb', function(err, res) {
    if (err) throw err;
    console.log(res)
    connection.end();
    });
}
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
            