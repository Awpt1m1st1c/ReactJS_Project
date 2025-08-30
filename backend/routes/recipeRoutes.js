const express = require("express");
const router = express.Router();

// Example data (replace with database logic)
const recipes = [
  { title: "Spaghetti Bolognese" },
  { title: "Chicken Curry" },
  { title: "Vegetable Stir Fry" },
];

// GET /recipes
router.get("/", (req, res) => {
  res.json(recipes); // Send the recipes as JSON
});

module.exports = router;
