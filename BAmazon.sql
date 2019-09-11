DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  product_sales INT default 0
);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs INT default 0
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    "The Dark Tower: The Gunslinger",
    "Literature",
    25,
    1000
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    "The Dark Tower II: The Drawing of the Three",
    "Literature",
    25,
    1500
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    "The Dark Tower III: The Waste Lands",
    "Literature",
    25,
    1200
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    "The Dark Tower IV: Wizard and Glass",
    "Literature",
    25,
    1300
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    "The Dark Tower V: Wolves of the Calla",
    "Literature",
    25,
    2200
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    "The Dark Tower VI: Song of Susannah",
    "Literature",
    25,
    800
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    "The Dark Tower VII: The Dark Tower",
    "Literature",
    25,
    1600
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    "Madagascar Bourbon Vanilla Beans (35 Count)",
    "Cooking",
    45,
    200
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    "Football Helmet",
    "Sports",
    245,
    300
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    '12" cast iron pan',
    "Cooking",
    25,
    1000
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    'Sturgill Simpson: Metamodern Sounds in Country Music',
    "Music",
    25,
    900
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    'Paint Brush 8"',
    "Other",
    12,
    6000
);

INSERT INTO products (
  product_name,
  department_name,
  price,
  stock_quantity
)
values(
    'The Beatles: The White Album (LP)',
    "Music",
    35,
    1000
);

INSERT INTO departments (
  department_name,
  over_head_costs
)
values(
    'Literature',
    "2500"
);

INSERT INTO departments (
  department_name,
  over_head_costs
)
values(
    'Literature',
    "2500"
);

INSERT INTO departments (
  department_name,
  over_head_costs
)
values(
    'Cooking',
    "1500"
);
INSERT INTO departments (
  department_name,
  over_head_costs
)
values(
    'Sports',
    "4750"
);

INSERT INTO departments (
  department_name,
  over_head_costs
)
values(
    'Music',
    "3000"
);

INSERT INTO departments (
  department_name,
  over_head_costs
)
values(
    'Other',
    "5000"
);



