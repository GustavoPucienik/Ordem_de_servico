/* eslint-disable import/extensions */
require("dotenv/config");
const app = require("./api/app.js");

const port = process.env.PORTBACKEND || 8000;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
