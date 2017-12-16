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
        manager();
    });
};
//function bamazon
function manager(){
    inquirer.prompt([
    {
        name: "choice",
        type: 'list',
        message: 'Hello Manager choose something',
        choices :['View Low Inventory', 'Add to Inventory', 'Add New Product', 'exit']
    }
    ]).then(function(answer){      
        if(answer.choice === 'View Low Inventory'){
            lowInventory();
        }else if(answer.choice === 'Add to Inventory'){
            updateItem();
        }else if(answer.choice === 'Add New Product'){
            addItem();
        }else if(answer.choice === 'exit') {
        console.log('Have a Wonderful day');  
        connection.end()  
        process.exit();
        };   
    });
};

function lowInventory() {
    connection.query('select * FROM bamazon.products where stockQuantity < 5', function(err, res) {
        if (err) throw err;
        var productTable = new Table({
            head : ['Item ID', 'Item Name', 'Item Category', 'Price', 'Stock Quanity'],
            colWidths : [10,30,20,10,20] 
        }); 
        for (var i = 0; i < res.length; i++) {
            productTable.push(
                [res[i].item_id, res[i].itemName, res[i].itemCategory, res[i].price, res[i].stockQuantity]
            );
        }
        console.log(productTable.toString());
    })
};  

function updateItem() {
    inquirer.prompt([
    {
        name: 'id',
        type: 'input',
        message: `please enter the item id`
    },{
        name: `quantity`,
        type: `input`,
        message: `please enter the quanitity you want to add`
    }
    ]).then(function(answer){
        var id = answer.id
        var quantity = answer.quantity
        connection.query('SELECT * FROM Products WHERE item_id = ' + id, function(error, response) {
            if (error) { console.log(error) };
            connection.query('UPDATE Products SET StockQuantity = StockQuantity + ' + quantity + ' WHERE item_id = ' + id);
            console.log("product has been inserted");
            displayTable();
        });
    });    
};  

function addItem() {
    inquirer.prompt([
    {
        name: 'item',
        type: 'input',
        message: `please enter the item name`
    },{
        name: 'category',
        type: `input`,
        message: `please enter the category`
    },{
        name: `price`,
        type: `input`,
        message: `pleae enter the price`
    }, {
        name: `quantity`,
        type: `input`,
        message: `pleae enter the quanitity`
    }
    ]).then(function(answer){
    
        connection.query(`INSERT INTO bamazon.products (itemName, itemCategory, price, stockQuantity) 
        VALUES ("${answer.item}", "${answer.category}", ${answer.price},${answer.quantity})`, function(err, res) {
            if (err) throw err;
            console.log("product has been inserted");
            displayTable();
            manager();
        });
    });
};  
// * View Products for Sale

// * View Low Inventory

// * Add to Inventory

// * Add New Product
//function to ask users for id and quanity.
// function purchase() {
//     inquirer.prompt([
//     {
//         name: 'id',
//         type: 'input',
//         message:'What is the Item ID that you would like to purchase?'.red
//     }, {
//         name: 'quantity',
//         type: 'input',
//         message: "How many of this product would you like to purchase?".red
//     }
//     ]).then(function(answer){
//         var id = answer.id
//         var quantity = answer.quantity
//         //arguments to use for next function(thinking ahead);
//         updateToBamazon(id,quantity);
//     });
// };//end of purchase function

// //function to take in answers from users and update it to bamazon database
// function updateToBamazon(id, quantityPurchased) {
//     //connecting to database and targeting item_id 
//     connection.query('SELECT * FROM bamazon.products WHERE item_id' + id, function(err,res){
//         if (err) { console.log('error') }
//         console.log(quantityPurchased);
//         console.log(id);
//         if(quantityPurchased <= res.stockQuantity){
//             //var to store the total cost to display later
//             var totalCost = res.price * res.stockQuantity
//             console.log(`we have ${res.stockQuantity} of this items availiable`);
//             console.log(`your total is ${totalCost}`);
//         }else{
//             console.log("go away");
//         }
//         displayTable();
//     });
// };

// //calling function to run
displayTable();