const mongodb = require("../database/database.js");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  //#swagger.tags=["Books"]
  try {
    const result = await mongodb.getDatabase().db().collection("books").find();
    const books = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving books" });
  }
};

const getBookById = async (req, res) => {
  //#swagger.tags=["Books"]
  try {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("books").find({ _id: bookId });

    result.toArray().then((books) => {
      if (!books[0]) {
        return res.status(404).json({ error: "Book not found" });
      }

      res.setHeader("Content-Type", "application/json");
      res.status(200).json(books[0]);
    });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving book" });
  }
};

const createBook = async (req, res) => {
  //#swagger.tags=["Books"]
  try {
    const book = {
      title: req.body.title,
      authors: req.body.authors,
      publisher: req.body.publisher,
      publicationDate: req.body.publicationDate,
      isbn: req.body.isbn,
      language: req.body.language,
      pageCount: req.body.pageCount
    };

    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Book created', bookId: response.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to insert book into database' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'An error occurred while creating the book' });
  }
};

const updateBook = async (req, res) => {
  //#swagger.tags=["Books"]
  try {
    const bookId = new ObjectId(req.params.id);

    const book = {
      title: req.body.title,
      authors: req.body.authors,
      publisher: req.body.publisher,
      publicationDate: req.body.publicationDate,
      isbn: req.body.isbn,
      language: req.body.language,
      pageCount: req.body.pageCount
    };

    const response = await mongodb.getDatabase().db().collection('books').replaceOne({ _id: bookId }, book);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Book updated successfully' });
    } else {
      res.status(404).json({ error: 'Book not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'An error occurred while updating the book' });
  }
};

const deleteBook = async (req, res) => {
  //#swagger.tags=["Books"]
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("books").deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred while deleting the book" });
  }
};

module.exports = {
    getAll,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};