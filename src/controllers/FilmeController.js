import Controller from "./Controller.js";
import FilmeService from "../services/FilmeService.js";

const filmeService = new FilmeService();

/**
  * formata a saida de uma requisicao
  * @param {object} objResposta  objeto resposta padrao da requisao 
  * @return {object} objeto de saida formatado
*/
function formatedFilmeOutput(objResposta) {
  let saida = objResposta.dataValues;
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

  return saida;
}


export default class FilmeController extends Controller {
  constructor() {
    super(filmeService);
  }

  async adicionaFilme(req, res) {
    try {
      await filmeService.adicionarNovoFilme(req.body);
      return res.status(201).json({ message: "filme cadastrado" });
    } catch (error) {
      return res.status(500).json({ message: "erro ao adicionar filme", erro: error });
    }
  }

  async pegaTodosOsFilmes(req, res) {
    try {
      const filmesRetornados = await filmeService.pegaTodosOsFilmes(req.query);
      let apiOutput = [];

      if (filmesRetornados.length > 0) {
        // formating api output
        filmesRetornados.forEach(filme => {
          apiOutput.push(formatedFilmeOutput(filme));
        });
        // console.log(apiOutput);
        return res.status(200).json(apiOutput);

      } else {
        return res.status(404).json(apiOutput);
      }

    } catch (error) {
      console.error(`nao foi possivel retornar dos items: \n${error}`);
    }
  }

  async pegaOneFilmePorId(req, res) {
    try {
      const { id } = req.params;
      const filmeRetornado = await filmeService.pegaOneFilmePorId(id);

      if (filmeRetornado)
        return res.status(200).json(formatedFilmeOutput(filmeRetornado));

      else
        return res.status(404).json(filmeRetornado);


    } catch (error) {
      console.error(`nao foi possivel retornar FILME para esse ID: \t${error}`);
    }
  }
}
