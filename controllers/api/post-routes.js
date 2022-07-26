const router = require("express").Router();
const { Post } = require("../../models");
const { update } = require("../../models/PostModel");
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

router.put("/:id", withAuth, async (res, req) => {
	try {
		const updatePost = await Post.update(req.body, {
			where: {
				id: req.params.id,
			},
		});

		// in case the post cannot be found
		if (!updatePost) {
			res.status(404).json({ message: "Cannot find the post." });
		}

		res.status(200).json(updatePost);
	} catch (err) {
		res.status(500).json(err);
	}
});
// route to delete the user's post
