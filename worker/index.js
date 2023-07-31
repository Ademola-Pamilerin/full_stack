const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const key = require("./keys");
const { createClient } = require("redis");
const Redis = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const client = new Redis();

client
  .connect()
  .then((data) => {
    console.log("conencted successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const sub = client.db_instance.duplicate();

sub
  .connect()
  .then((data) => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.post("/", (req, res) => {
  try {
    const { value, id } = req.body;
    client.db_instance.hSet("values", id, value);
    sub.publish("insert", value.toString());
    res.status(200).json({ message: "successfull" });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await client.db_instance.hGetAll("values");
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/", async (req, res) => {
  try {
    const { id } = req.body;
    client.db_instance.hDel("values", id);
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("connected to " + 5000);
});
