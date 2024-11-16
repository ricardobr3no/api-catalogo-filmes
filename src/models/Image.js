import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Image = sequelize.define(
  "image",
  {
    filename: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  { tableName: "images", timestamps: false, freezeTableName: true },
);

export default Image;
