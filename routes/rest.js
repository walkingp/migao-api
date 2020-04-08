const express = require("express");
const router = express.Router({
  mergeParams: true,
});

router.get("/", async (req, res) => {
  let option = {};
  if (req.Model.modelName === 'Cate') {
    option.populate = 'parent';
  }
  const items = await req.Model.find().setOptions(option);
  res.send(items);
});
router.get("/:id", async (req, res) => {
  const model = await req.Model.findById(req.params.id).populate("parent");
  res.send(model);
});

router.put("/:id", async (req, res) => {
  const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
  res.send(model);
});

router.post("", async (req, res) => {
  const model = await req.Model.create(req.body);
  res.send(model);
});

router.delete("/:id", async (req, res) => {
  await req.Model.findByIdAndDelete(req.params.id);
  res.send({
    status: true,
  });
});

module.exports = router;