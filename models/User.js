const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false,
    set(val) {
      return require("bcryptjs").hashSync(val, 4);
    }
  }
});

module.exports = User = mongoose.model("User", UserSchema);