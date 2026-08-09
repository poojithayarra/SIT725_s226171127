const bookService = require("../services/books.service");

const getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();

        res.json({
            statusCode: 200,
            data: books,
            message: "Books retrieved successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving books"
        });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json({
            statusCode: 200,
            data: book
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving book"
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById
};