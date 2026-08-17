const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: [true, "Book ID is required"],
            unique: true,
            match: [/^b\d+$/, "Book ID must start with b followed by numbers"]
        },

        title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [2, "Title must be at least 2 characters"],
            maxlength: [100, "Title cannot exceed 100 characters"],
            trim: true
        },

        author: {
            type: String,
            required: [true, "Author is required"],
            minlength: [2, "Author must be at least 2 characters"],
            maxlength: [100, "Author cannot exceed 100 characters"],
            trim: true
        },

        year: {
            type: Number,
            required: [true, "Year is required"],
            min: [1000, "Year must be 1000 or later"],
            max: [new Date().getFullYear(), "Year cannot be in the future"],
            validate: {
                validator: Number.isInteger,
                message: "Year must be a whole number"
            }
        },

        genre: {
            type: String,
            required: [true, "Genre is required"],
            minlength: [2, "Genre must be at least 2 characters"],
            maxlength: [50, "Genre cannot exceed 50 characters"],
            trim: true
        },

        summary: {
            type: String,
            required: [true, "Summary is required"],
            minlength: [10, "Summary must be at least 10 characters"],
            maxlength: [500, "Summary cannot exceed 500 characters"],
            trim: true
        },

           price: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, "Price is required"],
        validate: {
            validator: function(value) {
                const numberValue = parseFloat(value.toString());
                return numberValue >= 0 && numberValue <= 10000;
            },
            message: "Price must be between 0 and 10000"
        }
    }
},
{
    strict: "throw"
}
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;