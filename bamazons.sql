DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id int NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("NewAmsterdam","Beverage",19.99,200),
    ("Chardonnay","Beverage",5.99,100),
    ("Socks","Clothing",7.99,50),
    ("Cheerios","Food",3.95,20),
    ("Oats","Food",5.99,100),
    ("Tanks","Clothing",12.05,20),
    ("Watermelon","Food",2.99,5),
    ("Mango Juice","Beverage",6.99,30),
    ("Ring Pop","Food",1.99,10),
    ("Shorts","Clothing",27.19,29);

