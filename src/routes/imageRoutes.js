import { Router } from "express";
import ImageController from "../controllers/ImageController.js";
import { upload } from "../config/multerConfig.js";

const imageController = new ImageController();
const routes = Router();

routes.get("/image/:id", (req, res) =>
  imageController.pegaImagePorId(req, res),
);

routes.post("/image/:id", upload.single("capa"));

export default routes;
