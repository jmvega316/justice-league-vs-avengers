const router = require("express").Router();
const { Hero } = require("../../models");
const withAuth = require("../../utils/auth");

// one for avengers and one for JL
router.get("/avenger", withAuth, async (req, res) => {
	try {
	} catch (err) {
		res.status(400).json(err);
	}
});

// will need to render the images and name of t he hero based on category

//
