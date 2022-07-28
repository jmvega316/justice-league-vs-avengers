const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// to get all of the posts and render them
router.get("/", async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [{ model: User, attributes: { exclude: ["password"] } }],
			// I want to order in descending order
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

// to get one single post by the post id
router.get("/posts/:id", async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: { exclude: ["password"] },
				},
				{
					model: Comment,
					include: [{ model: User, attributes: { exclude: ["password"] } }],
				},
			],
		});

		const singlePost = postData.get({ plain: true });

		res.render("postpage", {
			singlePost,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// get posts by user on the dashbaord page
router.get("/dashboard", withAuth, async (req, res) => {
	try {
		const postData = await Post.findAll({
			where: {
				user_id: req.session.user_id,
			},
		});

		const userPosts = postData.map((post) => post.get({ plain: true }));

		res.render("dashboard", {
			userPosts,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// while on the dashbaord page, I want to create a post
router.get("/dashboard/newpost", withAuth, async (req, res) => {
	try {
		res.render("newpost");
	} catch (err) {
		res.status(500).json(err);
	}
});
// also have the option to edit my posts
router.get("/dashboard/editpost/:id", withAuth, async (req, res) => {
	try {
		const editData = await Post.findByPk(req.params.id);

		const editPost = editData.get({ plain: true });

		res.render("editpost", {
			editPost,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// if possible, on a separte page, I want to be able to render posts that I have commented

router.get("/follow", withAuth, async (req, res) => {
	try {
		const commentedPostData = await Comment.findAll({
			where: {
				user_id: req.session.user_id,
			},
			include: [
				{
					model: User,
					attributes: { exclude: ["password"] },
				},
				{
					model: Post,
					include: [{ model: User, attributes: { exclude: ["password"] } }],
				},
			],
		});

		const followComment = commentedPostData.map((post) =>
			post.get({ plain: true })
		);

		res.render("follow", {
			followComment,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
// able to log in anywhere
router.get("/login", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}

	res.render("login");
});
// able to log out anywhere
router.get("/signup", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}
	res.render("signup");
});

module.exports = router;
