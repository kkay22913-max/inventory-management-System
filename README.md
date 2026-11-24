MongoDB Inventory Management System

1. Project Overview

The MongoDB Inventory Management System is a database application designed to help businesses manage and monitor their inventory.

The system allows users to add, view, update, delete, and search for products. It also manages product categories and records stock transactions.

The project uses MongoDB as its database, Node.js and Express.js for the backend, and HTML, CSS, and JavaScript for the frontend.

2. Project Objectives

- Manage inventory records efficiently.
- Store and retrieve product information.
- Organise products into categories.
- Record incoming stock transactions.
- Monitor stock quantities.
- Provide a simple dashboard for inventory management.

3. Technologies Used

Technology| Purpose
MongoDB| NoSQL database
MongoDB Compass| Database management
Node.js| Backend runtime
Express.js| Backend framework
HTML| Webpage structure
CSS| Dashboard styling
JavaScript| Frontend functionality
Git and GitHub| Version control

4. System Features

- Add new products.
- View available products.
- Update product quantities.
- Delete products.
- Search for products.
- View product categories.
- View stock transactions.
- Automatically record Stock In transactions when adding products.
- Display inventory statistics on the dashboard.

5. Database Structure

Database name: "InventoryManagementDB"

The database contains three collections:

Products

Stores product information, including product ID, name, category, quantity, and unit price.

Categories

Stores product category information, including category ID, category name, and description.

Stock Transactions

Stores stock transaction information, including transaction ID, product ID, product name, transaction type, quantity, date, and description.

6. Project Structure

Inventory-Management-System/
│
├── backend/
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── node_modules/
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

7. Installation and Setup

Requirements

- Node.js
- MongoDB Community Server
- MongoDB Compass
- Visual Studio Code

Step 1: Clone the repository

git clone https://github.com/kkay22913-max/inventory-management-System.git

Step 2: Open the project folder

cd inventory-management-System

Step 3: Install dependencies

npm install

Step 4: Start MongoDB

Ensure MongoDB Community Server is running on your computer.

The application connects to:

mongodb://127.0.0.1:27017

Ensure the database "InventoryManagementDB" and its collections exist.

Step 5: Start the backend

node backend/server.js

The backend runs at:

http://localhost:3000

Step 6: Open the frontend

Open "frontend/index.html" using the Live Server extension in Visual Studio Code.

8. API Endpoints

Method| Endpoint| Purpose
GET| /api/products| Retrieve products
POST| /api/products| Add a product
PUT| /api/products/:id| Update a product
DELETE| /api/products/:id| Delete a product
GET| /api/categories| Retrieve categories
GET| /api/stock-transactions| Retrieve stock transactions

9. Why MongoDB?

MongoDB is suitable for this project because:

- It stores data in flexible document structures.
- It supports different types of inventory records.
- It handles CRUD operations efficiently.
- It supports queries and updates.
- It allows the application to grow as inventory requirements increase.

10. Conclusion

The MongoDB Inventory Management System demonstrates how a NoSQL database supports inventory operations. It combines MongoDB, Node.js, Express.js, and frontend technologies to provide a working inventory management prototype.

11. Repository

GitHub: https://github.com/kkay22913-max/inventory-management-System