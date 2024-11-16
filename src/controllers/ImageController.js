import ImageService from "../services/ImageService.js";
import Controller from "./Controller.js";

import { fileURLToPath } from "url";
import path from "path";

const __dirname = fileURLToPath(import.meta.url);

const imageService = new ImageService();

export default class ImageController extends Controller {
  constructor() {
    super(imageService);
  }

  async pegaImage(req, res) {
    await res.json(req.params);
  }

  async pegaTodasCapas(req, res) {
    await res.json({ capas: req.files });
  }

  async adicionaCapa(req, res) {
    const currFile = req.files.capa;
    const newFilename = req.params.imageId;
    const folderPath = path.resolve(__dirname, "../../..");

    let uploadPath =
      folderPath + "/thumbnails/" + newFilename + "_" + Date.now() + ".jpg";

    await currFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send("file upload");
    });
  }
}
