const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));

// router.get("/", (req, res) => {
//     //#swagger.tags=["Book Project Test"]
//     res.send("Book Project Test");
// });

router.use("/books", require("./books"));
router.use("/authors", require("./authors"));

router.get("/login", passport.authenticate("github"), (req, res) => {
    //#swagger.tags=["Authentication"]
});
router.get("/logout", function(req, res, next){
    //#swagger.tags=["Authentication"]
    req.logout(function(err){
        if (err) {return next(err);}
        res.redirect("/");
    });
});

module.exports = router;