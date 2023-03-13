import { Sequelize } from "sequelize";

// const sequelize = new Sequelize("chattify", "root", "root", {
//       host: "mysql",
//       dialect: "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
//       logging: true,
// });
const sequelize = new Sequelize("chattify", "root", "", {
      host: "localhost",
      dialect: "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
      logging: true,
      port: 3307,
});

export default sequelize;
