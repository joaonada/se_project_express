require('dotenv').config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();
const indexRouter = require("./routes/index");

app.use(cors());
const mongoUri = process.env.MONGODB_URI;
module.exports.jwtSecret = process.env.JWT_SECRET;
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db")
//mongoose.connect(mongoUri || "mongodb://127.0.0.1:27017/wtwr_db")
.then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Link to the server: ${PORT}`);
});
