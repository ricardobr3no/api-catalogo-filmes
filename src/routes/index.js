import diretorRoutes from "./diretorRoutes.js";
import filmeRoutes from "./filmeRoutes.js";
import generoRoutes from "./generoRoutes.js";
import imageRoutes from "./imageRoutes.js";

const routes = (app) => {
  app.get("/api", (req, res) => res.send("API funcionando..."));
  app.use("/api", diretorRoutes, generoRoutes, filmeRoutes, imageRoutes);
};

export default routes;
