import sequelize from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

const GeneroFilme = sequelize.define(
  "genero_filme",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    generoId: {
      type: DataTypes.INTEGER,
      references: {
        model: "genero",
        key: "id",
      },
    },
    filmeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "filme",
        key: "id",
      },
    },
  },
  { timestamps: false },
);

export default GeneroFilme;
