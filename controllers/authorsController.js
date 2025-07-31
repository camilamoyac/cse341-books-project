const mongodb = require("../database/database.js");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  //#swagger.tags=["Authors"]
  try {
    const result = await mongodb.getDatabase().db().collection("authors").find();
    const authors = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving authors" });
  }
};

const getAuthorById = async (req, res) => {
  //#swagger.tags=["Authors"]
  try {
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("authors").find({ _id: authorId });

    result.toArray().then((authors) => {
      if (!authors[0]) {
        return res.status(404).json({ error: "Author not found" });
      }

      res.setHeader("Content-Type", "application/json");
      res.status(200).json(authors[0]);
    });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving author" });
  }
};

const createAuthor = async (req, res) => {
    //#swagger.tags=["Authors"]
  try {
    const author = {
      fullName: req.body.fullName,
      penName: req.body.penName,
      birthDate: req.body.birthDate,
      nationality: req.body.nationality,
      books: req.body.books
    };

    const response = await mongodb.getDatabase().db().collection('authors').insertOne(author);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Author created', authorId: response.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to create author' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'An error occurred while creating the author' });
  }
};

const updateAuthor = async (req, res) => {
  //#swagger.tags=["Authors"]
  try {
    const authorId = new ObjectId(req.params.id);
    const author = {
      fullName: req.body.fullName,
      penName: req.body.penName,
      birthDate: req.body.birthDate,
      nationality: req.body.nationality,
      books: req.body.books
    };

    const response = await mongodb.getDatabase().db().collection("authors").replaceOne({ _id: authorId }, author);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Author not found or no changes made" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the author" });
  }
};

const deleteAuthor = async (req, res) => {
  //#swagger.tags=["Authors"]
  try {
    const authorId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("authors").deleteOne({ _id: authorId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the author" });
  }
};

module.exports = {
    getAll,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};