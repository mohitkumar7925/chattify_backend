import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import sequelize from "../config/db";

export interface MessageType extends Model<InferAttributes<MessageType>, InferCreationAttributes<MessageType>> {
      message_id?: number;
      chat_id: string;
      fromUser_id: number;
      toUser_id: number;
      message: string;
      
      
}

const Message = sequelize.define<MessageType>("message", {
      message_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
      },
      chat_id: { type: DataTypes.STRING },
      fromUser_id: { type: DataTypes.NUMBER },
      toUser_id: { type: DataTypes.NUMBER },
      message: { type: DataTypes.STRING },
      
});

export default Message;
