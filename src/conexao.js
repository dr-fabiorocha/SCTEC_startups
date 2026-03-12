const mongoose = require("mongoose");
require("dotenv").config();

mongoose.start = async function () {
  this.connect(process.env.PROJ_MONGO_SERVER + process.env.PROJ_DB, {})
    .then(() =>
      console.log(
        `Conectado: MongoDB: ${process.env.PROJ_MONGO_SERVER} ${process.env.PROJ_DB}`,
      ),
    )
    .catch((err) => log("Erro ao conectar ao MongoDB", err));
};

module.exports = mongoose;
