const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/booksCatalog";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Routes
const booksRoutes = require("./routes/books.routes");

app.use("/api/books", booksRoutes);