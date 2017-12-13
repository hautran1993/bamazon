DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE  bamazon;

CREATE TABLE products (
	item_id integer(50) auto_increment not null,
    itemName varchar(50) not null,
    itemCategory varchar(50) not null,
    price decimal(10,2) not null,
    stockQuanity integer(50) not null,
    primary Key(item_id)

);

INSERT INTO products (itemName, ItemCategory, price, stockQuanity)

	values ('pho tai','soup', 9.99 , 100);
    

INSERT INTO products (itemName, ItemCategory, price, stockQuanity)

	values ('Salad Bowl with Steak','salad', 9.99 , 100);
    

INSERT INTO products (itemName, ItemCategory, price, stockQuanity)

	values ('combination rice platter','Rice Dish', 12.99 , 100);
    

INSERT INTO products (itemName, ItemCategory, price, stockQuanity)

	values ('tarro-bobba','desert', 3.99 , 100);
    