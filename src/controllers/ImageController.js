import ImageService from "../services/ImageService.js";
import Controller from "./Controller.js";
import fs from "fs";
import path from "path";

const imageService = new ImageService();

export default class ImageController extends Controller {
  constructor() {
    super(imageService);
  }

  async pegaImagePorId(req, res) {
    const titulo = req.params.imageId;

    // ler diretorio e exibir imagem encontrada
    fs.readdir("./src/thumbnails/", async (err, arquivos) => {
      if (err) throw err;
      const arquivoEncontrado = arquivos.filter(arq => arq.includes(titulo))[0]
      const dirPath = path.resolve("./src/thumbnails/");

      if (arquivoEncontrado && arquivoEncontrado.split("_")[0] === titulo) {
        return res.status(200).sendFile(dirPath + "/" + arquivoEncontrado);
      } else {
        return res.status(404).send("Not Found")
      }
    });
  }

  async adicionaCapa(req, res) {
    res.status(201).send({ message: `tudo enviado!` });
  }
}
