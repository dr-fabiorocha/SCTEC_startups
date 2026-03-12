const mongoose = require("../src/conexao"); // Importa a conexão

const EntusiastaSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    hashedPassword: { type: String },
    email: { type: String },
    segmentosInteresse: [String],
  },
  {
    versionKey: false, // ❌ remove __v
    timestamps: false,
  },
);

const Entusiasta = mongoose.model("entusiasta", EntusiastaSchema);

module.exports = Entusiasta;
