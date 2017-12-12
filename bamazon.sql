DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE  bamazon;

CREATE TABLE products(
	item_id integer(50) auto_increment not null,
    productName varchar(50) not null,
    price integer(50) not null,
    stockquanity integer(50) not null,
    primary Key(item_id)

);

