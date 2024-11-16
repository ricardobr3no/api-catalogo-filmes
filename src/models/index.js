import Filme from "./Filme.js";
import Genero from "./Genero.js";
import Diretor from "./Diretor.js";
import GeneroFilme from "./GeneroFilme.js";
import Image from "./Image.js";

// --- associations ---
Filme.belongsTo(Diretor);
Diretor.hasMany(Filme);

Filme.hasMany(Image);
Image.belongsTo(Filme);

Filme.belongsToMany(Genero, {
  through: GeneroFilme,
  foreignKey: "filmeId",
  otherKey: "generoId",
  as: "generos", // alias para include
});
Genero.belongsToMany(Filme, {
  through: GeneroFilme,
  foreignKey: "generoId",
  otherKey: "filmeId",
  as: "filmes", // alias para include
});
// -----------------

const db = {
  Genero,
  Filme,
  Diretor,
  Image,
};

export default db;
