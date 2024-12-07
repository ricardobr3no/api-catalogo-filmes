import sequelize from "./config/dbConfig.js";
import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import path from "path";

await sequelize.sync(/* { alter: true } */);

try {
  await sequelize.authenticate();
  // console.clear();
  console.log("\nConexao estabelecida com sucesso!");
} catch (error) {
  console.error("Nao foi possivel conectar ao banco de dados : ", error);
}

const app = express();
app.use(express.json(), cors());

routes(app);

app.get("/doc", (req, res) => {
  const docPath = path.resolve("./doc");
  return res.sendFile(docPath + "/index.html");
});

export default app;
