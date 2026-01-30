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
  await mongoose.connect(
    "mongodb+srv://dbuser:dbuser@cluster0.iajznvj.mongodb.net/?appName=Cluster0",
  );
}

app.listen(5000, () => {
  console.log("App Running on 5000");
  connectdb().then(() => {
    console.log("Database connected");
  });
});
