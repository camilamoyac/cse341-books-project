const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swagger.tags=["Book Project Test"]
    res.send("Book Project Test");
});

router.use("/books", require("./books"));
router.use("/authors", require("./authors"));

module.exports = router;