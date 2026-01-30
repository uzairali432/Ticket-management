const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const router = require("./routes/index.route");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use("/api", router);

async function connectdb() {
  mongoose.set("autoIndex", true);
  await mongoose.connect(process.env.MONGODB_URL);
}

app.listen(process.env.PORT || 5000, () => {
  console.log("App Running on port", process.env.PORT || 5000);
  connectdb().then(() => {
    console.log("Database connected");
  });
});
