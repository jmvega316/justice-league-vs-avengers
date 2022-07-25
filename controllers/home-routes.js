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

// to get one single post by the post id
router.get("/posts/:id", async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attribute: { exclude: [password] },
				},
				{
					model: Comment,
					include: [{ model: User, attribute: { exclude: [password] } }],
				},
			],
		});

		const singlePost = postData.get({ plain: true });

		res.render("postpage", {
			singlePost,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.render(500).json(err);
	}
});

// the other page to render is the dashbaord page
router.get("/dashboard", withAuth, async (req, res) => {
	try {
		const postData = await Post.findAll({
			where: {
				user_id: req.session.user_id,
			},
		});

		const dashboard = postData.map((post) => post.get({ plain: true }));

		res.render("dashboard", {
			dashboard,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.render(500).json(err);
	}
});

// while on the dashbaord page, I want to create a post
router.get("/dashboard/newpost", withAuth, async (req, res) => {
	try {
		res.render("newpost");
	} catch (err) {
		res.render(500).json(err);
	}
});
// also have the option to edit my posts
router.get("/dashboard/editpost/:id", withAuth, async (req, res) => {
	try {
		const editData = await Post.findByPk(req.params.id);

		const editPost = editData.get({ plain: true });

		res.render("editPost", {
			editPost,
			loggedIn: res.session.loggedIn,
		});
	} catch (err) {
		res.render(500).json(err);
	}
});
// if possible, on a separte page, I want to be able to render posts that I have commented

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
