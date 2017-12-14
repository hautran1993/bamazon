DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE  bamazon;

CREATE TABLE products (
	item_id integer(50) auto_increment not null,
    itemName varchar(50) not null,
    itemCategory varchar(50) not null,
    price decimal(10,2) not null,
    stockQuantity integer(50) not null,
    primary Key(item_id)

);

INSERT INTO products (itemName, ItemCategory, price, stockQuantity)

	values ('Concords 11s','sport', 300 , 3);
    

INSERT INTO products (itemName, ItemCategory, price, stockQuantity)

	values ('brown dress shoes','dress shoes', 150 , 3);
    

INSERT INTO products (itemName, ItemCategory, price, stockQuantity)

	values ('Fire red 4s','sport', 200 , 20);
    

INSERT INTO products (itemName, ItemCategory, price, stockQuantity)

	values ('yeezy 300 boost','sport', 300 , 3);
    
    
INSERT INTO products (itemName, ItemCategory, price, stockQuantity)

	values ('LV Dress Shoes','Dress Shoes', 300 , 3);
    
    