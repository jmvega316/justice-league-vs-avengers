const { Hero } = require("../models");

const avengersData = [
	{
		hero_name: "Iron Man",
		category: "Avengers",
		image:
			"https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/346-iron-man.jpg",
	},
	{
		hero_name: "Ant-Man",
		category: "Avengers",
		image:
			"https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/30-ant-man.jpg",
	},
	{
		hero_name: "Wasp",
		category: "Avengers",
		image:
			"https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/708-wasp.jpg",
	},
	{
		hero_name: "Thor",
		category: "Avengers",
		image:
			"https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/659-thor.jpg",
	},
	{
		hero_name: "Hulk",
		category: "Avengers",
		image:
			"https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/332-hulk.jpg",
	},
];

const seedAvengers = () => Hero.bulkCreate(avengersData);

module.exports = seedAvengers;
