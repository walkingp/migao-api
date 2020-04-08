const express = require("express");
const router = express.Router();

const Article = require("./../models/Article");

router.get("/", async (req, res) => {
  const articles = await Article.find();
  res.send(articles);
});
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.send(article);
});

router.put("/:id", async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body);
  res.send(article);
});

router.post("", async (req, res) => {
  const artice = await Article.create(req.body);
  res.send(artice);
});

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.send({
    status: true,
  });
});

module.exports = router;