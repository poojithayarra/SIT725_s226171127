const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const booksRoutes = require("./routes/books.routes");

app.use("/api/books", booksRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});