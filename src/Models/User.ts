import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import sequelize from "../config/db";

export interface UserType extends Model<InferAttributes<UserType>, InferCreationAttributes<UserType>> {
      user_id?: number;
      name: string;
      mobile: string;
      password: string;
}

const User = sequelize.define<UserType>("user", {
      user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
      },
      name: { type: DataTypes.STRING },
      mobile: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
});

export default User;
