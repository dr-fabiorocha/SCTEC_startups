const Entusiasta = require("../src/entusiasta");
const express = require("express");
var router = express.Router();

router.get("/", async function (request, response, next) {
  console.log("Obtem a lista de usuarios");
  let a = await Entusiasta.getAll();
  response.json(a);
});

router.get("/:username", async function (request, response, next) {
  const USERNAME = request.params.username;
  console.log("Obtem dados completos de um usuario " + USERNAME);
  let a = await Entusiasta.get(USERNAME);
  response.json(a);
});
router.post("/", async function (request, response, next) {
  console.log("Cria um novo usuario: ");

  const dados = request.body;
  let res = await Entusiasta.newEntusiasta(dados);
  response.json(res);
});
router.delete("/:username", async function (request, response, next) {
  const USERNAME = request.params.username;

  console.log("Remove usuario " + USERNAME);

  try {
    const res = await Entusiasta.remove(USERNAME);
    response.json(res);
  } catch (e) {
    next(e);
  }
});
router.put("/:username", async (req, res, next) => {
  try {
    console.log("Atualiza usuario");
    const result = await Entusiasta.update(req.params.username, req.body);
    res.json(result);
  } catch (e) {
    res.json({});
  }
});

module.exports = router;
