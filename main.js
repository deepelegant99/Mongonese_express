require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { Dog } = require("./models");
const app = express();
const PORT = process.env.PORT || 8000;
mongoose.set("strictQuery", false);
app.use(express.json());

app.get("/dogs", async (req, res) => {
  const allDogs = await Dog.find();
  return res.status(200).json(allDogs);
});



const start = async () => {
  try {
    await mongoose.connect(process.env.Database_URI);
    app.listen(PORT, () => console.log(`Server is listening in port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
