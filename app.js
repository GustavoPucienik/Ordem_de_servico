/* eslint-disable import/no-extraneous-dependencies */
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT; // porta que vai rodar o servidor

app.use(bodyParser.json()); // converter para json

app.get("/", (req, res) => res.send("hello word"));
app.listen(port, () => {
  console.log(`servidor rodando na porta localhost:${port}`);
});
