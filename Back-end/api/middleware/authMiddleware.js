const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env; // Certifique-se de definir a variável de ambiente JWT_SECRET

function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization; // o token é enviado no cabeçalho de autorização

  if (typeof bearerHeader !== "undefined") {
    // Divide o cabeçalho em partes e pega a segunda parte, que é o token
    const bearerToken = bearerHeader.split(" ")[1];

    // Agora você tem o token disponível para uso
    console.log("Token:", bearerToken);
    res.json(bearerToken);
  }
}

module.exports = verifyToken;
