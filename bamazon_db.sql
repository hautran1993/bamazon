Drop database if exists bamazon_db;

create database bamazon_db;

use bamazon_db;

create table bamazon_tb (
	item_id INT NOT null,
    product_name varchar(100)  null,
    department_name varchar(100) null,
    price int(100), 
    
	primary key(item_id)    
);