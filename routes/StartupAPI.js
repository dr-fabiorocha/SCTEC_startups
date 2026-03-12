const Startup = require("../src/startup");
const express = require("express");
var router = express.Router();

router.post("/buscaPorSegmentos", async function (request, response, next) {
  console.log("Obtem a lista de startups que são de segmentos de interesse");
  const dados = request.body.lista;

  let a = await Startup.buscaPorSegmentos(dados);
  response.json(a);
});

router.get("/", async function (request, response, next) {
  console.log("Obtem a lista de startups");
  let a = await Startup.getAll();
  response.json(a);
});

router.get("/:nome", async function (request, response, next) {
  const NOME = request.params.nome;
  console.log("Obtem dados completos da startup " + NOME);
  let a = await Startup.get(NOME);
  response.json(a);
});
router.post("/", async function (request, response, next) {
  console.log("Cria uma nova Startup: ");

  const dados = request.body;
  let res = await Startup.newStartup(dados);
  response.json(res);
});
router.delete("/:nome", async function (request, response, next) {
  const NOME = request.params.nome;

  console.log("Remove startup " + NOME);

  try {
    const res = await Startup.remove(NOME);
    response.json(res);
  } catch (e) {
    next(e);
  }
});
router.put("/:nome", async (req, res, next) => {
  try {
    console.log("Atualiza startup");
    const result = await Startup.update(req.params.nome, req.body);
    res.json(result);
  } catch (e) {
    res.json({});
  }
});

module.exports = router;
