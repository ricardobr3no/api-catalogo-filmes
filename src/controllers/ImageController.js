import ImageService from "../services/ImageService.js";
import Controller from "./Controller.js";

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
