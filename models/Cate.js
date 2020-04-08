const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Cate",
  },
});

module.exports = mongoose.model("Cate", schema);