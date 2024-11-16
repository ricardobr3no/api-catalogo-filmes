import { Router } from "express";
import ImageController from "../controllers/ImageController.js";

const imageController = new ImageController();
const routes = Router();

// routes.get("/image", (req, res) => imageController.pegaTodasCapas(req, res));
routes.get("/image/:imageId", (req, res) =>
  imageController.pegaPorId(req, res),
);
routes.post("/image/:imageId", (req, res) =>
  imageController.adicionaCapa(req, res),
);

export default routes;
