import { Sequelize } from "sequelize";

const sequelize = new Sequelize("chattify", "user", process.env.DB_PASSWORD, {
      host: process.env.MYSQL_HOST,
      // host: "16.170.227.222",
      dialect: "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
      logging: true,
});

export default sequelize;


