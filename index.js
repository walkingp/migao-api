const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const Config = require("./config/const");

const mongoose = require("mongoose");
mongoose
  .connect(Config.MONGODB_CONNSTR, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const user = require("./routes/user");
const article = require("./routes/article");
const rest = require("./routes/rest");

const auth = require("./middleware/auth");
const classify = require("./middleware/classify");

app.use("/api", user);
app.use("/api/articles", auth, article);
app.use("/api/rest/:resource", classify, auth, rest);

const multer = require("multer");
const upload = multer({
  dest: __dirname + "/upload",
});
app.post("/api/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  file.url = `http://localhost:3001/upload/${file.filename}`;
  res.send(file);
});
app.use("/upload", express.static(__dirname + "/upload"));

app.listen(3001, () => {
  console.log(`server http://localhost:3001 started`);
});