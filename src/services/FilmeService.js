import Service from "./Service.js";
import db from "../models/index.js";
import { Op } from "sequelize";

export default class FilmeService extends Service {
  constructor() {
    super("Filme");
  }

  async adicionarNovoFilme(DTO) {
    const { generoId, ...data } = DTO;
    const filme = await db.Filme.upsert(data);

    if (!filme) {
      throw new Error("Filme nao econtrado");
    }
    // await filme.addGeneros(generoId);
  }

  async pegaTodosOsFilmes(queryObject) {
    if (Object.keys(queryObject).length === 0) { // verificar se objeto é vazio
      return db.Filme.findAll({
        attributes: [
          "id",
          "titulo",
          "ano",
          "sinopse",
          "genero",
          "duracao",
        ],
        include: [
          {
            model: db.Genero,
            as: "generos",
            attributes: ["nome"],
            through: { attributes: [] }, // atributos da tabela intermediaria
          },
          {
            model: db.Diretor,
            attributes: ["nome"],
          },
        ],
      });

    } else {

      return db.Filme.findAll({
        where: {
          titulo: {
            [Op.substring]: queryObject.titulo, // pegar os filmes cujop titulo incluam o parametro
          },

          ano:
            (function() {
              if (queryObject.ano) {
                return {
                  [Op.eq]: queryObject.ano
                }
              }
              return {
                [Op.lte]: new Date().getFullYear() // retorna todos <= current year
              }
            })(),

          genero: {
            [Op.substring]: queryObject.genero
          }
        },

        attributes: [
          "id",
          "titulo",
          "ano",
          "sinopse",
          "genero",
          "duracao",
        ],
        include: [
          {
            model: db.Genero,
            as: "generos",
            attributes: ["nome"],
            through: { attributes: [] }, // atributos da tabela intermediaria
          },
          {
            model: db.Diretor,
            attributes: ["nome"],
          },
        ],
      });
    }
  }
}
