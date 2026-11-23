Inventory Management System

Project Overview

The Inventory Management System is a database project developed using MongoDB. It helps manage products, categories, stock quantities, and inventory records.

The project demonstrates how a NoSQL database stores and manages inventory information.

Objectives

- Store product information.
- Organize products into categories.
- Track available stock quantities.
- Manage inventory records.
- Demonstrate CRUD operations using MongoDB.

Technologies Used

- MongoDB Community Server
- MongoDB Compass
- MongoDB Shell (mongosh)

Database Structure

Database name: "InventoryManagementDB"

The database contains three collections:

1. "products": Stores product details, prices, quantities, suppliers, and categories.
2. "categories": Stores product category information.
3. "stockTransactions": Intended to record stock movements.

Project Folder Structure

Inventory-Management-System/
├── Database_Scripts/
│   ├── 01_create_collections.js
│   └── 02_insert_sample_data.js
├── Sample_Data/
├── Screenshots/
└── README.md

Current Progress

- MongoDB installed and configured.
- Database created.
- Three collections created.
- Sample categories inserted.
- Sample products inserted.

Future Improvements

- Demonstrate Create, Read, Update, and Delete operations.
- Record stock-in and stock-out transactions.
- Add inventory search and low-stock queries.
- Include database screenshots.

Academic Project

Developed as part of an Advanced Database Systems assignment.
