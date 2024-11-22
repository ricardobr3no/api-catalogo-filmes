import diretorRoutes from "./diretorRoutes.js";
import filmeRoutes from "./filmeRoutes.js";
import generoRoutes from "./generoRoutes.js";
import imageRoutes from "./imageRoutes.js";

const routes = (app) => {
  app.get("/", (req, res) => res.send("API funcionando..."));
  app.use("/", diretorRoutes, generoRoutes, filmeRoutes, imageRoutes);
};

export default routes;
