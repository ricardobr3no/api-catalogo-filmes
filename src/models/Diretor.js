import sequelize from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

const Diretor = sequelize.define(
  "diretor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false, tableName: "diretor", freezeTableName: true },
);

export default Diretor;
