const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json()); // so backend can read JSON data
app.use(cors()); // allow React frontend to talk to backend

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working! 🚀");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

const recipeRoutes = require("./routes/recipeRoutes");
app.use("/recipes", recipeRoutes);
