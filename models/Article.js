const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date,
    set() {
      return new Date()
    }
  },
  author: {
    type: String
  },
  body: {
    type: String
  },
  imageUrl: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  },
  cates: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Cate"
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Article", ArticleSchema);