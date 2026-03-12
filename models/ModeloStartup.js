const mongoose = require("../src/conexao"); // Importa a conexão

const StartupSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome da startup é obrigatório"],
      unique: true,
      trim: true,
    },

    responsavel: {
      type: String,
      trim: true,
      default: "",
    },

    sede: {
      type: String,
      trim: true,
      default: "",
    },
    segmento: [{ type: String, lowercase: true }],
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      trim: true,
      default: "",
    },

    link: {
      type: String,
      trim: true,
      default: "",
    },

    pagina: {
      type: String,
      trim: true,
      default: "",
    },

    objetivo: [
      {
        type: String,
        enum: ["divulgacao", "investimento", "socios"],
      },
    ],
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

const Startup = mongoose.model("startup", StartupSchema);

module.exports = Startup;
