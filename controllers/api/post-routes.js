const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// posts can be created, updated, or deleted
// route to create post
router.post("/", withAuth, async (req, res) => {
	try {
		const newPost = await Post.create({
			title: req.body.title,
			content: req.body.content,
			user_id: req.session.user_id,
		});

		res.status(200).json(newPost);
	} catch (err) {
		res.status(400).json(err);
	}
});

// route to update the user's post

// route to delete the user's post
