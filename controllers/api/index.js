const router = require("express").Router();

const userRoute = require("./user-routes");
const postRoute = require("./post-routes");
const commentRoute = require("./comment-routes");
const heroRoute = require("./hero-routes");

router.use("/users", userRoute);
router.use("/posts", postRoute);
router.use("/comments", commentRoute);
router.use("/heroes", heroRoute);

module.exports = router;
