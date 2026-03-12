const mongoose = require("../src/conexao"); // Importa a conexão

const StartupSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O codigo do programa é obrigatório"],
      unique: true,
    },
    responsavel: { type: String },
    sede: { type: String, default: "" },
    segmento: [{ type: String, lowercase: true }],
    email: { type: String, default: "" },
    status: { type: String, default: "" },
    link: { type: String, default: "" },
    pagina: { type: String, default: "" },
    objetivo: [String],
  },
  {
    versionKey: false, // ❌ remove __v
    timestamps: false,
  },
);

const Startup = mongoose.model("startup", StartupSchema);

module.exports = Startup;
