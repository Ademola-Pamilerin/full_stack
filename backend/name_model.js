const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NameSChema = new Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
});

const NameModel = mongoose.model("Name", NameSChema);
module.exports = NameModel;
