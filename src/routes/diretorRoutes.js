import { Router } from "express";
import DiretorController from "../controllers/DiretorController.js";

const diretorController = new DiretorController();
const routes = Router();

routes.get("/diretor", (req, res) => diretorController.pegaTodos(req, res));
routes.post("/diretor", (req, res) => diretorController.criar(req, res));
routes.get("/diretor/:id", (req, res) => diretorController.pegaPorId(req, res));
routes.put("diretor/:id", (req, res) =>
  diretorController.atualizaPorId(req, res),
);
routes.delete("diretor/:id", (req, res) =>
  diretorController.deletaPorId(req, res),
);

export default routes;
