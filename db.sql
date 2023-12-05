CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';

CREATE TYPE statuses AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE IF NOT EXISTS carts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_at DATE NOT NULL DEFAULT CURRENT_DATE,
  status statuses
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(6, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS carts_items (
  cart_id uuid NOT NULL,
  product_id uuid NOT NULL,
  count INT NOT NULL,
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id uuid NOT NULL,
  user_id uuid NOT NULL,
  payment JSON NOT NULL,
  delivery JSON NOT NULL,
  comments TEXT,
  status statuses,
  total DECIMAL(6, 2) NOT NULL,
  FOREIGN KEY (cart_id) REFERENCES carts(id)
);

INSERT INTO carts (user_id, status) VALUES ('d7c745f1-974a-4197-bff3-3f496e725939', 'OPEN');
INSERT INTO carts (user_id, status) VALUES ('275d41e5-0f57-4146-8561-6ecfaff00287', 'ORDERED');

INSERT INTO products (title, description, price) VALUES ('test row1', 'test row1 description', 1.0);
INSERT INTO products (title, description, price) VALUES ('test row2', 'test row2 description', 2.1);
INSERT INTO products (title, description, price) VALUES ('test row3', 'test row3 description', 3.2);
INSERT INTO products (title, description, price) VALUES ('test row4', 'test row4 description', 4.3);
INSERT INTO products (title, description, price) VALUES ('test row5', 'test row5 description', 5.4);

INSERT INTO carts_items (cart_id, product_id, count) VALUES ('d9689872-5c8c-4115-88de-ef236379db8a', 'a0b78eca-ea27-4d5e-8008-ba6fc6102c6f', 1);
INSERT INTO carts_items (cart_id, product_id, count) VALUES ('d9689872-5c8c-4115-88de-ef236379db8a', 'ff736eb4-3dd7-4e9f-bfb2-84f74961fa9b', 2);
INSERT INTO carts_items (cart_id, product_id, count) VALUES ('c5019964-ca9d-492d-b02d-52b057706b1b', 'ed9d0c17-5956-4b30-99e6-5244e5cc5961', 3);

INSERT INTO orders (cart_id, user_id, payment, delivery, total)
VALUES ('c5019964-ca9d-492d-b02d-52b057706b1b', '275d41e5-0f57-4146-8561-6ecfaff00287', '{ "type": "card", "address": "1", "creditCard": "1" }', '{ "type": "np", "address": "1" }', 8.6);