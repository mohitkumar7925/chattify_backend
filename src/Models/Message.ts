import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import sequelize from "../config/db";
import ChatGroup from "./ChatGroup";
import User from "./User";

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
      chat_id: {
            type: DataTypes.STRING,
            references: {
                  model: ChatGroup,
                  key: "chat_id",
            },
      },
      fromUser_id: {
            type: DataTypes.NUMBER,
            references: {
                  model: User,
                  key: "user_id",
            },
      },
      toUser_id: {
            type: DataTypes.NUMBER,
            references: {
                  model: User,
                  key: "user_id",
            },
      },
      message: { type: DataTypes.STRING },
});

Message.belongsTo(User, {
      foreignKey: "fromUser_id",
      as: "fromKey",
});
Message.belongsTo(User, {
      foreignKey: "toUser_id",
      as: "toKey",
});

export default Message;
