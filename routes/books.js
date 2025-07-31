const router = require("express").Router();
const { bookValidationRules, validate } = require('../validators/bookValidator');
const  booksController = require("../controllers/booksController");

router.get("/", booksController.getAll);
router.get("/:id", booksController.getBookById);
router.post('/', bookValidationRules(), validate, booksController.createBook);
router.put('/:id', bookValidationRules(), validate, booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;