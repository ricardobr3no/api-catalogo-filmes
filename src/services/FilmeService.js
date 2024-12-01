import Service from "./Service.js";
import db from "../models/index.js";
import { Op } from "sequelize";
import sequelize from "../config/dbConfig.js";

export default class FilmeService extends Service {
  constructor() {
    super("Filme");
  }

  async adicionarNovoFilme(DTO) {
    const { generoId, ...data } = DTO;
    const filme = await db.Filme.create(data);

    if (!filme) {
      throw new Error("Filme nao econtrado");
    }
    await filme.addGeneros(generoId);
  }


  async pegaOneFilmePorId(id) {

    return db.Filme.findByPk(id, {
      attributes: [
        "id",
        "titulo",
        "ano",
        "sinopse",
        "classificacao",
        // `createdAt`, `updatedAt`
        // "genero",
        // "duracao",
      ],
      include: [ // incluir informaçoes das tabelas relacionadas
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

  async pegaTodosOsFilmes(queryObject) {
    if (Object.keys(queryObject).length === 0) { // verificar se objeto é vazio
      return db.Filme.findAll({
        attributes: [
          "id",
          "titulo",
          "ano",
          "sinopse",
          "classificacao",
          // `createdAt`,
          // `updatedAt`
          // "genero",
          // "duracao",
        ],
        include: [ // incluir informaçoes das tabelas relacionadas
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
          titulo: (function() {
            if (queryObject.titulo)
              return { [Op.substring]: queryObject.titulo }
            return { [Op.substring]: "" }
          })(),

          ano: (function() {
            if (queryObject.ano)
              return { [Op.eq]: queryObject.ano }
            return { [Op.lte]: new Date().getFullYear() } // retorna todos <= current year
          })(),
        },

        attributes: [
          "id",
          "titulo",
          "ano",
          "sinopse",
          "classificacao",
          // `createdAt`, `updatedAt`,
          // "genero",
          // "duracao",
        ],
        include: [ // incluir informaçoes das tabelas relacionadas

          {
            model: db.Genero,
            as: "generos",
            attributes: ["nome"],
            through: { attributes: [] },// atributos da tabela intermediaria
            // aplicando filtro pelo query
            where: {
              nome: (function() {
                if (queryObject.genero)
                  return { [Op.substring]: queryObject.genero };
                return { [Op.substring]: "" };
              })()
            },
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
