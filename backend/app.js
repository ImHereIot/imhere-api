var express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentsRoute = require('./packages/students/routes')
const classRoute  = require('./packages/class/routes');
const config = require('./config/config');
const url  = config.bd_string;

const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 5,
  useNewUrlParser: true
};

mongoose.connect(url, options);
mongoose.set("useCreateIndex", true);


const aluno = mongoose.model("aluno", {
  name: String,
  aula: String,
  matriculado: Boolean
});

app.use('/api/check',studentsRoute);
app.use('/api/class',classRoute);



app.listen( process.env.PORT || 5000 );

module.exports = app;
