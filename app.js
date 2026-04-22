const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { register, login } = require("./controllers/auth");
const auth = require("./middlewares/auth");

const { PORT = 3001 } = process.env;
const app = express();


app.use(cors());
const uri = "mongodb+srv://joaonada_db_user:Jersee47@cluster0.mgux474.mongodb.net/?appName=Cluster0";
mongoose.connect(uri);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/signup", register);
app.post("/signin", login);

app.use("/items", require("./routes/items"));

app.use("/users", auth, require("./routes/users"));

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Link to the server: ${PORT}`);
});
