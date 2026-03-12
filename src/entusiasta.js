const Entusiasta = require("../models/ModeloEntusiasta");

async function getAll() {
  let alvo = await Entusiasta.find({}, { _id: 0, username: 1 });
  return alvo;
}

async function get(nome) {
  let alvo = await Entusiasta.findOne({ username: nome }, { _id: 0 });
  return alvo;
}

async function newEntusiasta(dados) {
  let alvo = {};

  try {
    let tmp = await Entusiasta.create(dados);
    const { _id, ...rest } = tmp.toObject();
    alvo = rest;
  } catch (e) {
    return {};
  }
  return alvo;
}
async function update(username, dados) {
  let informacoes = { ...dados };
  let resposta = null;

  try {
    const doc = await Entusiasta.findOne({ username: username });
    if (doc) {
      Object.assign(doc, informacoes);
      await doc.save();
      const { _id, ...rest } = doc.toObject();
      resposta = rest;
    }
  } catch (e) {}

  return resposta;
}
async function remove(username) {
  let alvo;
  let resposta = "falha";
  try {
    alvo = await Entusiasta.deleteOne({ username: username });
    if (alvo.deletedCount === 0) {
      resposta = "falha";
    } else {
      resposta = "sucesso";
    }
  } catch (e) {}
  return resposta;
}

module.exports = {
  getAll,
  get,
  newEntusiasta,
  remove,
  update,
};
