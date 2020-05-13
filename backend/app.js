const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const personRoute = require("./packages/person/routes");
const classRoute = require("./packages/class/routes");
const studentsClassRoute = require("./packages/studentsClass/routes");
const crewModelRoute = require("./packages/crew/routes");
const config = require("./config/config");
const url = config.bd_string;
const options = {
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options);
mongoose.set("useCreateIndex", true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/check", personRoute);
app.use("/api/class", classRoute);
app.use("/api/studentsClass", studentsClassRoute);
app.use("/api/crew", crewModelRoute);
app.use("/", personRoute);

const PORT = 5000;
app.listen(process.env.PORT || PORT);

module.exports = app;
