const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Student Grade Calculator API is running"
    });
});

app.get("/api/student", (req, res) => {
    res.status(200).json({
        name: "Poojitha",
        course: "SIT725",
        status: "active"
    });
});

const PORT = 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;