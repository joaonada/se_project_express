const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();
const indexRouter = require("./routes/index");

app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Link to the server: ${PORT}`);
});
