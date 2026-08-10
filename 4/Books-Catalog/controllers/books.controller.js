const bookService = require("../services/books.service");

const STUDENT_ID = "226171127";

const getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();

        res.status(200).json({
            statusCode: 200,
            developedBy: STUDENT_ID,
            data: books,
            message: "Books retrieved successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            statusCode: 500,
            developedBy: STUDENT_ID,
            message: "Error retrieving books"
        });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);

        if (!book) {
            return res.status(404).json({
                statusCode: 404,
                developedBy: STUDENT_ID,
                message: "Book not found"
            });
        }

        res.status(200).json({
            statusCode: 200,
            developedBy: STUDENT_ID,
            data: book
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            statusCode: 500,
            developedBy: STUDENT_ID,
            message: "Error retrieving book"
        });
    }
};

const createBook = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);

        res.status(201).json({
            statusCode: 201,
            developedBy: STUDENT_ID,
            data: book,
            message: "Book created successfully"
        });

    } catch (error) {
        console.error(error);

        if (error.code === "DUPLICATE_ID") {
            return res.status(409).json({
                statusCode: 409,
                developedBy: STUDENT_ID,
                message: error.message
            });
        }

        if (
            error.name === "ValidationError" ||
            error.name === "StrictModeError" ||
            error.code === "IMMUTABLE_ID" ||
            error.message.startsWith("Unexpected field")
        ) {
            return res.status(400).json({
                statusCode: 400,
                developedBy: STUDENT_ID,
                message: error.message,
                errors: error.errors
                    ? Object.values(error.errors).map(err => err.message)
                    : undefined
            });
        }

        res.status(500).json({
            statusCode: 500,
            developedBy: STUDENT_ID,
            message: "Error creating book"
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await bookService.updateBook(
            req.params.id,
            req.body
        );

        res.status(200).json({
            statusCode: 200,
            developedBy: STUDENT_ID,
            data: book,
            message: "Book updated successfully"
        });

    } catch (error) {
        console.error(error);

        if (error.code === "NOT_FOUND") {
            return res.status(404).json({
                statusCode: 404,
                developedBy: STUDENT_ID,
                message: error.message
            });
        }

        if (
            error.name === "ValidationError" ||
            error.name === "StrictModeError" ||
            error.code === "IMMUTABLE_ID" ||
            error.message.startsWith("Unexpected field")
        ) {
            return res.status(400).json({
                statusCode: 400,
                developedBy: STUDENT_ID,
                message: error.message,
                errors: error.errors
                    ? Object.values(error.errors).map(err => err.message)
                    : undefined
            });
        }

        res.status(500).json({
            statusCode: 500,
            developedBy: STUDENT_ID,
            message: "Error updating book"
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook
};