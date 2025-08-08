const router = require("express").Router();
const { authorValidationRules, validate } = require('../validators/authorValidator');
const  authorsController = require("../controllers/authorsController");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", authorsController.getAll);
router.get("/:id", authorsController.getAuthorById);
router.post('/', isAuthenticated, authorValidationRules(), validate, authorsController.createAuthor);
router.put('/:id', isAuthenticated, authorValidationRules(), validate, authorsController.updateAuthor);
router.delete("/:id", isAuthenticated, authorsController.deleteAuthor);

module.exports = router;