const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const NameModel = require("./name_model");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("connection successful");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.get("/", async (req, res) => {
  try {
    const find = await NameModel.find();
    res.status(200).json({ message: find });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const { value } = req.body;
    console.log(value);
    if (!value) {
      throw new Error("An error occurred, please check your input");
    }
    let createdValue = new NameModel({ value: value.trim() });
    await createdValue.save();
    res.status(202).json({ message: "Created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(4000, () => {
  console.log("connected to port " + 4000);
});
