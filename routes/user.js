const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Config = require("./../config/const");
const User = require("./../models/User");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  res.send("ok");
});

router.get("/users", auth, async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/register", async (req, res) => {
  // await User.deleteMany();
  const user = await User.create(req.body);
  res.send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  }).select("+password");

  if (!user) {
    return res.status(421).send({
      message: "用户名不存在",
    });
  }
  const isPwdValid = require("bcryptjs").compareSync(
    req.body.password,
    user.password,
  );
  if (!isPwdValid) {
    return res.status(421).send({
      message: "密码错误",
    });
  }

  //生成token
  const token = jwt.sign({
      id: String(user._id),
    },
    Config.SECRET_KEY,
  );
  res.send({
    user,
    token,
  });
});

router.get("/profile", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;