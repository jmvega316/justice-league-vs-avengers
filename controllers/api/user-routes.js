const router = require("express").Router();
const { User } = require("../../models");

// sign up and create credentials in the database
router.post("/", async (req, res) => {
	try {
		const userData = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});

		req.session.save(() => {
			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
