// server.js
const mongoose = require("mongoose");
const express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
const app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const cors = require("cors");

// const db = config.get("mongoURI");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

const test = "";
console.log(test);

const db =
  "mongodb+srv://dr:sSXGDQnstqEWcLHx@cluster0-4ie2c.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: "grocerydata",
  })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err + "There is no connection"));

mongoose.set("debug", true);

//if you are on this path, require this file//
//this creates API routes//
app.use("/", require("./routes/groceryitems"));
