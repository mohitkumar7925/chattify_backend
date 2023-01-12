import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import sequelize from "../config/db";

export interface ChatGroupType extends Model<InferAttributes<ChatGroupType>, InferCreationAttributes<ChatGroupType>> {
      chat_id: string;
      toUser_id: number;
      fromUser_id: number;
      
}

const ChatGroup = sequelize.define<ChatGroupType>("chatGroup", {
      chat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
      },
      toUser_id: { type: DataTypes.INTEGER },
      fromUser_id: { type: DataTypes.INTEGER }
      
},{
    tableName:'chatGroup'
});

export default ChatGroup;
