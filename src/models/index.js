import Filme from "./Filme.js";
import Genero from "./Genero.js";
import Diretor from "./Diretor.js";
import GeneroFilme from "./GeneroFilme.js";
import Image from "./Image.js";

// --- associations ---
// 1:m
Filme.belongsTo(Diretor);
Diretor.hasMany(Filme);
// 1:m
Filme.hasMany(Image);
Image.belongsTo(Filme);
// m:n
Filme.belongsToMany(Genero, {
  through: GeneroFilme,
  foreignKey: "filmeId",
  otherKey: "generoId",
  as: "generos", // alias para include
  onDelete: "Cascade"
});
Genero.belongsToMany(Filme, {
  through: GeneroFilme,
  foreignKey: "generoId",
  otherKey: "filmeId",
  as: "filmes", // alias para include
  onDelete: "Cascade"
});
// -----------------

export const db = {
  Filme,
  Genero,
  Diretor,
}

export default db;
