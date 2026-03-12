require("dotenv").config();
const bancoDados = require("./src/conexao.js");
var express = require("express");
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use("/REST/entusiasta", require("./routes/EntusiastaAPI"));
app.use("/REST/startup", require("./routes/StartupAPI"));

app.use(function (err, request, response, next) {
  next(err);
});

app.use(function (err, request, response, next) {
  response.status(err.status || 500).json({ err: err.message });
});

app.listen(process.env.PROJ_PORT, async function () {
  console.log("Backend rodando na porta " + process.env.PROJ_PORT);
  await bancoDados.start();
});
