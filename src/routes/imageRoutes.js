import { Router } from "express";
import ImageController from "../controllers/ImageController.js";
import { upload } from "../config/multerConfig.js";
import multer from "multer";

const imageController = new ImageController();
const routes = Router();
const uploadCapa = upload.single("capa");

routes.get("/image/:imageId", (req, res) =>
  imageController.pegaPorId(req, res),
);

routes.post("/image/:imageName", (req, res) => {
  // middleware
  uploadCapa(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      throw Error("A multer error occurred when uploading\nErro: ", err);
    }
    else if (err) {
      throw Error("An unknown error occurred when uploading.\nErro: ", err);
    }
  })
},
  // api function
  (req, res) =>
    imageController.adicionaCapa(req, res),
);

export default routes;
