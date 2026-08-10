const Book = require("../models/book.model");

const ALLOWED_FIELDS = [
    "id",
    "title",
    "author",
    "year",
    "genre",
    "summary",
    "price"
];

const checkForUnexpectedFields = (data) => {
    const receivedFields = Object.keys(data);

    const unexpectedFields = receivedFields.filter(
        field => !ALLOWED_FIELDS.includes(field)
    );

    if (unexpectedFields.length > 0) {
        throw new Error(
            `Unexpected field(s): ${unexpectedFields.join(", ")}`
        );
    }
};

const getAllBooks = async () => {
    return await Book.find();
};

const getBookById = async (id) => {
    return await Book.findOne({ id });
};

const createBook = async (bookData) => {
    checkForUnexpectedFields(bookData);

    const existingBook = await Book.findOne({
        id: bookData.id
    });

    if (existingBook) {
        const error = new Error("A book with this ID already exists");
        error.code = "DUPLICATE_ID";
        throw error;
    }

    const book = new Book(bookData);

    return await book.save();
};

const updateBook = async (id, updateData) => {
    checkForUnexpectedFields(updateData);

    if (Object.prototype.hasOwnProperty.call(updateData, "id")) {
        const error = new Error("Book ID cannot be changed");
        error.code = "IMMUTABLE_ID";
        throw error;
    }

    const existingBook = await Book.findOne({ id });

    if (!existingBook) {
        const error = new Error("Book not found");
        error.code = "NOT_FOUND";
        throw error;
    }

    Object.keys(updateData).forEach(field => {
        existingBook[field] = updateData[field];
    });

    return await existingBook.save();
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook
};