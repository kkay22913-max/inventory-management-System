use("InventoryManagementDB");

// Insert categories
db.categories.insertMany([
  {
    categoryId: "CAT001",
    name: "Electronics",
    description: "Electronic devices and equipment"
  },
  {
    categoryId: "CAT002",
    name: "Computer Accessories",
    description: "Computer peripherals and accessories"
  },
  {
    categoryId: "CAT003",
    name: "Office Furniture",
    description: "Furniture used in offices"
  }
]);

// Insert products
db.products.insertMany([
  {
    productId: "P001",
    name: "HP Laptop",
    categoryId: "CAT001",
    category: "Electronics",
    quantity: 15,
    unitPrice: 6500,
    reorderLevel: 5,
    supplier: "ABC Technologies"
  },
  {
    productId: "P002",
    name: "Samsung Monitor",
    categoryId: "CAT001",
    category: "Electronics",
    quantity: 8,
    unitPrice: 2800,
    reorderLevel: 5,
    supplier: "Tech Supplies Ltd"
  },
  {
    productId: "P003",
    name: "Wireless Mouse",
    categoryId: "CAT002",
    category: "Computer Accessories",
    quantity: 30,
    unitPrice: 150,
    reorderLevel: 10,
    supplier: "Computer World"
  },
  {
    productId: "P004",
    name: "USB Keyboard",
    categoryId: "CAT002",
    category: "Computer Accessories",
    quantity: 12,
    unitPrice: 250,
    reorderLevel: 5,
    supplier: "Computer World"
  },
  {
    productId: "P005",
    name: "Office Chair",
    categoryId: "CAT003",
    category: "Office Furniture",
    quantity: 3,
    unitPrice: 1200,
    reorderLevel: 5,
    supplier: "Office Solutions"
  },
  {
    productId: "P006",
    name: "Office Desk",
    categoryId: "CAT003",
    category: "Office Furniture",
    quantity: 10,
    unitPrice: 1800,
    reorderLevel: 4,
    supplier: "Office Solutions"
  }
]);