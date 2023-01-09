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

app.get('/dogs/:id', async (req, res)=>{
  const {id} = req.params;
  const dog = Dog.findById(id)
  return res.status(200).json(dog)
})
app.post('/dogs', async (req, res)=>{
  const newDog = new Dog({...req.body});
  const insertedDog = await newDog.save();
  return res.status(201).json(insertedDog);
})

app.put('/dogs/:id', async (req, res)=>{
  const {id} = req.params;
  await Dog.updateOne({id}, req.body)
  const updatedDog = await Dog.findById(id)
  return res.status(200).json(updatedDog)
})

app.delete('/dogs/:id', async (req, res)=>{
  const {id} = req.params;
  const deletedDog = await Dog.findByIdAndDelete(id)
  return res.status(200).json(deletedDog)
})

const start = async () => {
  try {
    await mongoose.connect(process.env.Database_URI);
    app.listen(PORT, () => console.log(`Server is listening in port ${PORT}`));
  } catch (err) {
   // console.log(err);
  }
};

start();
