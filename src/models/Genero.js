import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Genero = sequelize.define(
  "genero",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    // descricao: { type: DataTypes.STRING },
  },
  { tableName: "generos", timestamps: false, freezeTableName: true },
);

export default Genero;
