const API_URL = "http://localhost:3000/api/products";

// Load products from MongoDB
async function loadProducts() {
    const productTable = document.getElementById("productTable");

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();
        await loadDashboardStats(products);

        productTable.innerHTML = "";

        if (products.length === 0) {
            productTable.innerHTML = `
                <tr>
                    <td colspan="5">No products found.</td>
                </tr>
            `;
            return;
        }

        products.forEach(product => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${product.productId || ""}</td>
                <td>${product.name || ""}</td>
                <td>${product.category || ""}</td>
                <td>${product.quantity ?? 0}</td>
                <td>${product.unitPrice ?? 0}</td>
                <td>
    <button onclick="editProduct('${product._id}')">Edit</button>
    <button onclick="deleteProduct('${product._id}')">Delete</button>
</td>
            `;

            productTable.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading products:", error);

        productTable.innerHTML = `
            <tr>
                <td colspan="5">Unable to load products.</td>
            </tr>
        `;
    }
}
async function loadDashboardStats(products) {
    document.getElementById("totalProducts").textContent = products.length;

    const totalStock = products.reduce((total, product) => {
        return total + Number(product.quantity || 0);
    }, 0);

    document.getElementById("totalStock").textContent = totalStock;

    const lowStock = products.filter(product => {
        return Number(product.quantity || 0) <= Number(product.reorderLevel || 0);
    }).length;

    document.getElementById("lowStock").textContent = lowStock;

    const response = await fetch("http://localhost:3000/api/categories");
    const categories = await response.json();

    document.getElementById("totalCategories").textContent = categories.length;
}
// Load products when the page opens
loadProducts();
// Open Add Product Form
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");

addProductBtn.addEventListener("click", () => {
    addProductForm.style.display = "block";
});
// Add a new product to MongoDB
const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newProduct = {
        productId: document.getElementById("productId").value,
        name: document.getElementById("productName").value,
        category: document.getElementById("productCategory").value,
        quantity: Number(document.getElementById("productQuantity").value),
        unitPrice: Number(document.getElementById("productPrice").value)
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        if (!response.ok) {
            throw new Error("Failed to add product");
        }

        alert("Product added successfully!");

        productForm.reset();
        addProductForm.style.display = "none";

        loadProducts();

    } catch (error) {
        alert("Error adding product. Please try again.");
        console.error(error);
    }
});
// Edit an existing product
async function editProduct(id) {
    const newQuantity = prompt("Enter the new quantity:");

    if (newQuantity === null) {
        return;
    }

    if (newQuantity.trim() === "" || Number(newQuantity) < 0 || !Number.isFinite(Number(newQuantity))) {
        alert("Please enter a valid quantity.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantity: Number(newQuantity)
            })
        });

        if (!response.ok) {
            throw new Error("Update failed");
        }

        alert("Product updated successfully!");
        loadProducts();

    } catch (error) {
        alert("Error updating product.");
        console.error(error);
    }
}
// Delete an existing product
async function deleteProduct(id) {
    const confirmDelete = confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        alert("Product deleted successfully!");

        loadProducts();

    } catch (error) {
        alert("Error deleting product.");
        console.error(error);
    }
}

// Search products
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll("#productTable tr");

    rows.forEach(row => {
        const productDetails = row.textContent.toLowerCase();

        row.style.display = productDetails.includes(searchTerm)
            ? ""
            : "none";
    });
});

// Load categories from MongoDB
async function loadCategories() {
    const categoriesTable = document.getElementById("categoriesTable");

    try {
        const response = await fetch("http://localhost:3000/api/categories");
        const categories = await response.json();

        categoriesTable.innerHTML = "";

        categories.forEach(category => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${category.categoryId || ""}</td>
                <td>${category.name || ""}</td>
                <td>${category.description || ""}</td>
            `;

            categoriesTable.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading categories:", error);
        categoriesTable.innerHTML = `
            <tr>
                <td colspan="3">Unable to load categories.</td>
            </tr>
        `;
    }
}

// Sidebar navigation
const categoriesLink = document.getElementById("categoriesLink");
const productsSection = document.getElementById("productsSection");
const categoriesSection = document.getElementById("categoriesSection");

categoriesLink.addEventListener("click", () => {
    productsSection.style.display = "none";
    transactionsSection.style.display = "none";
    categoriesSection.style.display = "block";

    loadCategories();
});

// Return to Products section
const productsLink = document.getElementById("productsLink");

productsLink.addEventListener("click", () => {
    categoriesSection.style.display = "none";
    transactionsSection.style.display = "none";
    productsSection.style.display = "block";
});

// Load stock transactions from MongoDB
async function loadTransactions() {
    const transactionsTable = document.getElementById("transactionsTable");

    try {
        const response = await fetch("http://localhost:3000/api/stock-transactions");
        const transactions = await response.json();

        transactionsTable.innerHTML = "";

        if (transactions.length === 0) {
            transactionsTable.innerHTML = `
                <tr>
                    <td colspan="4">No stock transactions found.</td>
                </tr>
            `;
            return;
        }

        transactions.forEach(transaction => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${transaction.productId || ""}</td>
                <td>${transaction.transactionType || ""}</td>
                <td>${transaction.quantity || 0}</td>
                <td>${transaction.date || ""}</td>
            `;

            transactionsTable.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading transactions:", error);
        transactionsTable.innerHTML = `
            <tr>
                <td colspan="4">Unable to load transactions.</td>
            </tr>
        `;
    }
}

// Stock Transactions Navigation
const transactionsLink = document.getElementById("transactionsLink");
const transactionsSection = document.getElementById("transactionsSection");

transactionsLink.addEventListener("click", () => {
    productsSection.style.display = "none";
    categoriesSection.style.display = "none";
    transactionsSection.style.display = "block";

    loadTransactions();
});