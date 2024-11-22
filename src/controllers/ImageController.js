import ImageService from "../services/ImageService.js";
import Controller from "./Controller.js";

import { fileURLToPath } from "url";
import path from "path";
import { upload } from "../config/multerConfig.js";


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
    res.status(201).send({ message: `tudo enviado!` });
  }
}
