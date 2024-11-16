import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./banco.db",
  define: {
    freezeTableName: true,
    charset: "utf-8",
  },
});

export default sequelize;
