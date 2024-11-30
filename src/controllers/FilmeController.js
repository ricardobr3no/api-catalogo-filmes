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
      await res.status(201).json({ message: "filme cadastrado" });
    } catch (error) {
      console.error(`nao foi possivel adicionar item: ${error}`);
    }
  }

  async pegaFilmes(req, res) {
    try {
      const filmesRetornados = await filmeService.pegaTodosOsFilmes(req.query);
      let saida = filmesRetornados.length > 0 ? filmesRetornados[0].dataValues : null;

      if (saida) {
        // colocando nome do diretor como saida do atributo diretor 
        const diretor = saida["diretor"];
        const nomeDiretor = diretor.dataValues["nome"];
        saida["diretor"] = nomeDiretor;

        // extrair nome de cada genero e colocar no array
        let generosObjArray = saida["generos"];
        for (let i = 0; i < generosObjArray.length; i++) {
          const nomeGenero = generosObjArray[i].dataValues["nome"];
          generosObjArray[i] = nomeGenero;
        }
        saida["generos"] = generosObjArray;
        console.log(saida);
        // saida
        await res.status(200).json(saida);

      } else {
        await res.status(404).json(saida);
      }

    } catch (error) {
      console.error(`nao foi possivel retornar dos items: \n${error}`);
    }
  }

}
