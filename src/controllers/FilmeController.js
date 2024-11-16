import Controller from "./Controller.js";
import FilmeService from "../services/FilmeService.js";

const filmeService = new FilmeService();

export default class FilmeController extends Controller {
  constructor() {
    super(filmeService);
  }

  async adicionaFilme(req, res) {
    try {
      await filmeService.adicionarNovoFilme(req.body);
      res.status(201).json({ message: "filme cadastrado" });
    } catch (error) {
      console.error(`nao foi possivel adicionar item: ${error}`);
    }
  }

  async pegaFilmes(req, res) {
    try {
      const filmesRetornados = await filmeService.pegaTodosOsFilmes(req.query);
      res.status(200).json(filmesRetornados);
      console.log(req.query);
    } catch (error) {
      console.error(`nao foi possivel retornar dos items: ${error}`);
    }
  }
}
