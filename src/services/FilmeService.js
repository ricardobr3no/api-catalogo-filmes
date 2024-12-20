import Service from "./Service.js";
import db from "../models/index.js";
import { Op } from "sequelize";

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
        `createdAt`,
        `updatedAt`
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

    const filmes = await db.Filme.findAll({
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
        `createdAt`,
        `updatedAt`,
      ],

      include: [ // incluir informaçoes das tabelas relacionadas
        {
          model: db.Genero,
          as: "generos",
          attributes: ["nome"],
          through: { attributes: [] },// atributos da tabela intermediaria
        },
        {
          model: db.Diretor,
          attributes: ["nome"],
        },
      ],
    });

    // filtro de query genero
    if (queryObject.genero) {
      const arrayGenerosQuery = queryObject.genero.split("+");
      let filmesByGener = []

      filmes.forEach(filme => {
        const generosFilme = filme.dataValues.generos; // array de obj com dataValues
        const arrayNomesGeneros = generosFilme.map(genero => genero.dataValues.nome);

        for (const generoQuery of arrayGenerosQuery) {
          if (arrayNomesGeneros.includes(generoQuery)) {
            filmesByGener.push(filme);
            break;
          }
        }

      });
      // console.log(filmesByGener);
      return filmesByGener;
    }

    return filmes;
  }
}
