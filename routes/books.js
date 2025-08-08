const router = require("express").Router();
const { bookValidationRules, validate } = require('../validators/bookValidator');
const  booksController = require("../controllers/booksController");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", booksController.getAll);
router.get("/:id", booksController.getBookById);
router.post('/', isAuthenticated, bookValidationRules(), validate, booksController.createBook);
router.put('/:id', isAuthenticated, bookValidationRules(), validate, booksController.updateBook);
router.delete("/:id", isAuthenticated, booksController.deleteBook);

module.exports = router;