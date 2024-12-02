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
    const filmeId = req.params.id;

    // ler diretorio e exibir imagem encontrada, exibir noImage caso contrario
    fs.readdir("./src/thumbnails/", async (err, arquivos) => {
      if (err) throw err;
      const dirPath = path.resolve("./src/thumbnails/");

      try {
        const arquivoEncontrado = arquivos.filter(arq => arq.split("_")[0] === filmeId)[0];
        console.log("requesting file: ", arquivoEncontrado);
        if (arquivoEncontrado) {
          return res.status(200).sendFile(dirPath + "/" + arquivoEncontrado);
        } else {
          return res.status(404).sendFile(dirPath + "/noImage.jpg");
        }

      } catch (error) {
        if (error instanceof TypeError) console.error("NOT find file image");
        else console.error(`Erro desconhecido a tentar pegar imagem: ${error}`);
        return res.status(404).sendFile(dirPath + "/noImage.jpg");
      }
    });
  }
}
