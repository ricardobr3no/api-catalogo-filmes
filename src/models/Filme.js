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
    genero: {
      type: DataTypes.STRING,
    },
    duracao: {
      type: DataTypes.INTEGER,
    },
    ano: {
      type: DataTypes.INTEGER,
      defaultValue: 2020,
    },
    diretorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "diretor",
        key: "id",
      },
    },
  },
  { timestamps: false, tableName: "filmes", freezeTableName: true },
);

export default Filme;
