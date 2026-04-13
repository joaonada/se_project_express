const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const { register, login } = require("./controllers/auth");
const auth = require("./middleware/auth");

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

const cors = require("cors");

app.use(cors());

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/signup", register);
app.post("/signin", login);

app.use("/items", auth, require("./routes/items"));

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log("Link to the server:");
  console.log(BASE_PATH);
});
