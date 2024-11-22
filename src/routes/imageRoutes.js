import { Router } from "express";
import ImageController from "../controllers/ImageController.js";
import { upload } from "../config/multerConfig.js";


const imageController = new ImageController();
const routes = Router();

routes.get("/image/:imageId", (req, res) =>
  imageController.pegaPorId(req, res),
);
routes.post("/image/:imageName", upload.single("capa"), (req, res) =>
  imageController.adicionaCapa(req, res),
);

export default routes;
