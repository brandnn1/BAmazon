DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
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
    10
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
    15
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
    12
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
    13
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
    22
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
    8
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
    16
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
    2
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
    3
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
    10
);

