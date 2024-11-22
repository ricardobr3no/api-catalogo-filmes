import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./databse.db",
  define: {
    freezeTableName: true,
    charset: "utf-8",
  },
});

export default sequelize;
