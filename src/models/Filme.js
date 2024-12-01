import sequelize from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

const Filme = sequelize.define(
  "filme",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    sinopse: {
      type: DataTypes.TEXT,
      defaultValue: "sinopse do filme",
    },
    ano: {
      type: DataTypes.INTEGER,
      defaultValue: 2020,
    },
    classificacao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["L", "10", "12", "14", "16", "18"]]
      }
    },
    diretorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "diretor",
        key: "id",
      },
    },
  },
  { timestamps: true, tableName: "filmes", freezeTableName: true },
);

export default Filme;
