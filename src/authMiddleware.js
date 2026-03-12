// authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();
const log = require("./log");

function User(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido ou expirado" });
    }

    req.username = decoded.username; // guarda info do usuário no req
    next(); // segue para a rota
  });
}
function Admin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      log("Token inválido ou expirado");
      return res.status(403).json({ error: "Token inválido ou expirado" });
    }
    if (decoded.username != "admin")
      return res.status(401).json({ error: "Rota restrita" });

    req.username = decoded.username; // guarda info do usuário no req
    next(); // segue para a rota
  });
}
module.exports = { Admin, User }; // ✅ exporta função direto
