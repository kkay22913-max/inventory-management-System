const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");

        const db = client.db("InventoryManagementDB");

        // READ STOCK TRANSACTIONS
app.get("/api/stock-transactions", async (req, res) => {
    const transactions = await db.collection("stockTransactions").find().toArray();
    res.json(transactions);
});
        // READ CATEGORIES
app.get("/api/categories", async (req, res) => {
    const categories = await db.collection("categories").find().toArray();
    res.json(categories);
});

        // READ
        app.get("/api/products", async (req, res) => {
            const products = await db.collection("products").find().toArray();
            res.json(products);
        });

        // CREATE PRODUCT AND RECORD STOCK TRANSACTION
app.post("/api/products", async (req, res) => {
    try {
        const product = req.body;

        const result = await db.collection("products").insertOne(product);

        await db.collection("stockTransactions").insertOne({
            transactionId: "ST" + Date.now(),
            productId: product.productId,
            productName: product.name,
            transactionType: "Stock In",
            quantity: Number(product.quantity),
            date: new Date().toISOString().split("T")[0],
            description: "New product added to inventory"
        });

        res.status(201).json({
            message: "Product and stock transaction recorded successfully!",
            productId: result.insertedId
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

        // UPDATE
        app.put("/api/products/:id", async (req, res) => {
            try {
                const result = await db.collection("products").updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: req.body }
                );

                if (result.matchedCount === 0) {
                    return res.status(404).json({ message: "Product not found" });
                }

                res.json({ message: "Product updated successfully!" });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });

        // DELETE
        app.delete("/api/products/:id", async (req, res) => {
            try {
                const result = await db.collection("products").deleteOne({
                    _id: new ObjectId(req.params.id)
                });

                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: "Product not found" });
                }

                res.json({ message: "Product deleted successfully!" });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });

        // HOME
        app.get("/", (req, res) => {
            res.send("Inventory Management API is running!");
        });

        // START SERVER
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Connection error:", error);
    }
}

startServer();