const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// to get all of the posts and render them
router.get("/", async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [{ model: User, attribute: { exclude: [password] } }],
			// I want to order in descending orderr
			order: [["id", "DESC"]],
		});

		const posts = postData.map((post) => post.get({ plain: true }));

		res.render("homepage", {
			posts,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
