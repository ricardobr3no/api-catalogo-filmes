import { Router } from "express";
import GeneroController from "../controllers/GeneroController.js";

const generoController = new GeneroController();
const routes = Router();

routes.get("/genero", (req, res) => generoController.pegaTodos(req, res));
routes.post("/genero", (req, res) => generoController.criar(req, res));
routes.get("/genero/:id", (req, res) => generoController.pegaPorId(req, res));
routes.put("/genero/:id", (req, res) =>
  generoController.atualizaPorId(req, res),
);
routes.delete("/genero/:id", (req, res) =>
  generoController.deletaPorId(req, res),
);

export default routes;
