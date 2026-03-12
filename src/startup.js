const Startup = require("../models/ModeloStartup");

async function buscaPorSegmentos(listaSegmentos) {
  try {
    const startups = await Startup.find(
      {
        segmento: { $in: listaSegmentos },
      },
      { _id: 0 },
    );

    return startups;
  } catch (e) {
    console.log(e);
    return [];
  }
}
async function getAll() {
  let alvo = await Startup.find(
    {},
    { _id: 0, nome: 1, responsavel: 1, segmento: 1 },
  );
  return alvo;
}

async function get(nome) {
  let alvo = await Startup.findOne({ nome: nome }, { _id: 0 });
  return alvo;
}

async function newStartup(dados) {
  let alvo = {};

  try {
    let tmp = await Startup.create(dados);
    const { _id, ...rest } = tmp.toObject();
    alvo = rest;
  } catch (e) {
    return {};
  }
  return alvo;
}
async function update(nome, dados) {
  let informacoes = { ...dados };
  let resposta = null;

  try {
    const doc = await Startup.findOne({ nome: nome });
    if (doc) {
      Object.assign(doc, informacoes);
      await doc.save();
      const { _id, ...rest } = doc.toObject();
      resposta = rest;
    }
  } catch (e) {}

  return resposta;
}
async function remove(nome) {
  let alvo;
  let resposta = "falha";
  try {
    alvo = await Startup.deleteOne({ nome: nome });
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
  newStartup,
  remove,
  update,
  buscaPorSegmentos,
};
