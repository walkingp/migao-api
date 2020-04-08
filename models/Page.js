const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Page",
  },
  content: {
    type: String,
  },
  imageUrl: {
    type: String
  }
});

module.exports = mongoose.model("Page", schema);