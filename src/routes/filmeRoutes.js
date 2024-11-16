import { Router } from "express";
import FilmeController from "../controllers/FilmeController.js";

const filmeController = new FilmeController();
const routes = Router();

routes.get("/filmes", (req, res) => filmeController.pegaFilmes(req, res));
routes.post("/filmes", (req, res) => filmeController.adicionaFilme(req, res));
routes.get("/filmes/:id", (req, res) => filmeController.pegaPorId(req, res));
routes.put("filmes/:id", (req, res) => filmeController.atualizaPorId(req, res));
routes.delete("filmes/:id", (req, res) =>
  filmeController.deletaPorId(req, res),
);

export default routes;
