const classify = async (req, res, next) => {
  const modelName = require("inflection").classify(req.params.resource);
  req.Model = require(`./../models/${modelName}`);
  next();
}

module.exports = classify;