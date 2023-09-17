/* eslint-disable import/extensions */
require("dotenv/config");
const app = require("./api/app.js");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
