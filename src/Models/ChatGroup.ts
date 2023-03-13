import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import sequelize from "../config/db";
import Message from "./Message";
import User from "./User";

export interface ChatGroupType extends Model<InferAttributes<ChatGroupType>, InferCreationAttributes<ChatGroupType>> {
      chat_id: string;
      toUser_id: number;
      fromUser_id: number;
}

const ChatGroup = sequelize.define<ChatGroupType>(
      "chatGroup",
      {
            chat_id: {
                  type: DataTypes.STRING,
                  primaryKey: true,
            },
            toUser_id: {
                  type: DataTypes.INTEGER,
                  references: {
                        model: User,
                        key: "user_id",
                  },
            },
            fromUser_id: {
                  type: DataTypes.INTEGER,
                  references: {
                        model: User,
                        key: "user_id",
                  },
            },
      },
      {
            tableName: "chatGroup",
      }
);

// ChatGroup.belongsTo(User, {
//       as: "toUser_id",
// });
// ChatGroup.belongsTo(User, {
//       as: "fromUser_id",
// });
ChatGroup.belongsTo(User, {
      foreignKey: "fromUser_id",
      as: "fromKey",
});
ChatGroup.belongsTo(User, {
      foreignKey: "toUser_id",
      as: "toKey",
});
ChatGroup.hasMany(Message, {
      foreignKey: "chat_id",
      as: "messages",
});
Message.belongsTo(ChatGroup, {
      foreignKey: "chat_id",
      as: "messages",
});

export default ChatGroup;
