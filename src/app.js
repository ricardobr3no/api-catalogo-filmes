import sequelize from "./config/dbConfig.js";
import express from "express";
import routes from "./routes/index.js";
import fileUpload from "express-fileupload";
import cors from "cors";

await sequelize.sync();

try {
  await sequelize.authenticate();
  console.log("\nConexao estabelecida com sucesso!");
} catch (error) {
  console.error("Nao foi possivel conectar ao banco de dados : ", error);
}

const app = express();
app.use(express.json(), fileUpload(), cors());
routes(app);

export default app;
