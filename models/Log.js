const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Log", schema);