const jwt = require("jsonwebtoken");
const Config = require("../config/const");
const User = require("../models/User");

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(422).send({
      message: "无token信息"
    });
  }
  const raw = String(req.headers.authorization).split(" ").pop();
  if (!raw) {
    return res.status(422).send({
      message: "token信息错误"
    });
  }
  try {
    const {
      id
    } = jwt.verify(raw, Config.SECRET_KEY);
    if (!id) {
      return res.status(422).send({
        message: "无法获取用户信息"
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(422).send({
        message: "用户信息不存在"
      });
    }
    req.user = user;
  } catch (err) {
    return res.status(422).send({
      message: "token解析错误"
    });
  }
  next()
}

module.exports = auth;