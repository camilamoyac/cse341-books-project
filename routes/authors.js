const router = require("express").Router();
const { authorValidationRules, validate } = require('../validators/authorValidator');
const  authorsController = require("../controllers/authorsController");

router.get("/", authorsController.getAll);
router.get("/:id", authorsController.getAuthorById);
router.post('/', authorValidationRules(), validate, authorsController.createAuthor);
router.put('/:id', authorValidationRules(), validate, authorsController.updateAuthor);
router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;