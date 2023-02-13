import { Sequelize } from "sequelize";


const sequelize = new Sequelize('chattify', 'root', '', {
    host: 'localhost',
    dialect:'mariadb' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    logging:false,
    
    
    
  });

 
  export default sequelize;