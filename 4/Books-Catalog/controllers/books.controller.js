const booksService = require('../services/books.service');

function getBooks(req, res) {
  res.json(booksService.getAllBooks());
}

function addBook(req, res) {
  const book = booksService.addBook(req.body);
  res.status(201).json(book);
}

function updateBook(req, res) {
  const book = booksService.updateBook(req.params.id, req.body);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
}

function deleteBook(req, res) {
  const deleted = booksService.deleteBook(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json({ message: 'Book deleted' });
}

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};
