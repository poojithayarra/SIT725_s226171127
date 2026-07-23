const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5500;

function parseNumber(value) {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : null;
}

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Addition
app.get("/add", (req, res) => {
    const num1 = parseNumber(req.query.num1);
    const num2 = parseNumber(req.query.num2);

    if (num1 === null || num2 === null) {
        return res.status(400).json({ error: "Please provide valid numbers." });
    }

    console.log(`GET /add -> ${num1} + ${num2}`);
    res.json({
        operation: "Addition",
        result: num1 + num2
    });
});

// Subtraction
app.get("/subtract", (req, res) => {
    const num1 = parseNumber(req.query.num1);
    const num2 = parseNumber(req.query.num2);

    if (num1 === null || num2 === null) {
        return res.status(400).json({ error: "Please provide valid numbers." });
    }

    console.log(`GET /subtract -> ${num1} - ${num2}`);
    res.json({
        operation: "Subtraction",
        result: num1 - num2
    });
});

// Multiplication
app.get("/multiply", (req, res) => {
    const num1 = parseNumber(req.query.num1);
    const num2 = parseNumber(req.query.num2);

    if (num1 === null || num2 === null) {
        return res.status(400).json({ error: "Please provide valid numbers." });
    }

    console.log(`GET /multiply -> ${num1} * ${num2}`);
    res.json({
        operation: "Multiplication",
        result: num1 * num2
    });
});

// Division
app.get("/divide", (req, res) => {
    const num1 = parseNumber(req.query.num1);
    const num2 = parseNumber(req.query.num2);

    if (num1 === null || num2 === null) {
        return res.status(400).json({ error: "Please provide valid numbers." });
    }

    if (num2 === 0) {
        return res.json({ error: "Cannot divide by zero" });
    }

    console.log(`GET /divide -> ${num1} / ${num2}`);
    res.json({
        operation: "Division",
        result: num1 / num2
    });
});

function startServer() {
    return app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

if (require.main === module) {
    startServer();
}

module.exports = { app, startServer };