import sequelize from "./config/dbConfig.js";
import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";

await sequelize.sync();

try {
  await sequelize.authenticate();
  console.log("\nConexao estabelecida com sucesso!");
} catch (error) {
  console.error("Nao foi possivel conectar ao banco de dados : ", error);
}

const app = express();
app.set('view engine', 'ejs');
app.use(express.json(), cors());

routes(app);

export default app;
