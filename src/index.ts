import express from "express";
import http from "http";
import UserRoute from "./Routes/UserRoute";
import cors from "cors";
import rabbit from "amqplib";
import morgan from "morgan";
import Message from "./Models/Message";
import { Sequelize, Op } from "sequelize";
import User from "./Models/User";
import ChatGroup from "./Models/ChatGroup";

declare global {
      var rabbit_channel: rabbit.Channel;
}
interface MessageData {
      fromUser_id: number;
      toUser_id: number;
      chat_id: string;
      message: string;
}
const app = express();

const server = http.createServer(app);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

async function initializeRabbitMQ() {
      try {
            let connection = await rabbit.connect("amqp://guest:guest@rabbitmq", {});
            let channel: rabbit.Channel = await connection.createChannel();
            // global.rabbit_channel = channel;
            await channel.assertQueue("message");
            channel.consume("message", async (msg) => {
                  if (msg !== null) {
                        let data: MessageData = JSON.parse(msg.content.toString());
                        console.log("Recieved:", data);

                        if (data.fromUser_id) {
                              console.log(data);

                              let saveMessage = await Message.create({
                                    chat_id: data.chat_id,
                                    message: data.message,
                                    fromUser_id: data.fromUser_id,
                                    toUser_id: data.toUser_id,
                              });
                        }

                        channel.ack(msg);
                  } else {
                        console.log("Consumer cancelled by server");
                  }
            });
            console.log("rabbit connected");
      } catch (error) {
            console.log("error in rabbit mq", error);
            setTimeout(() => {
                  initializeRabbitMQ();
            }, 1000);
      }
}

app.use("/user", UserRoute);
app.get("/", (req, res, next) => {
      res.send({ message: "It is working", status: true });
});

// initializeRabbitMQ();
server.listen(4000, () => {
      console.log("listing on 4000");

      // Message.findAll({
      //       attributes: [
      //             // "chatGroup.chat_id",
      //             "chat_id",
      //             "toUser_id",
      //             "fromUser_id",
      //             "message",
      //             "message_id",
      //             [Sequelize.col("fromKey.name"), "name"],
      //             // [Sequelize.col("messages.message_id"), "message_id"],
      //             // [Sequelize.col("messages.message"), "message"],
      //       ],
      //       where: {
      //             message_id: {
      //                   // [Op.in]: Message.findAll({
      //                   //       attributes: ["message_id"],
      //                   //       where: {
      //                   //             [Op.or]: [
      //                   //                   {
      //                   //                         fromUser_id: 1,
      //                   //                   },
      //                   //                   {
      //                   //                         toUser_id: 1,
      //                   //                   },
      //                   //             ],
      //                   //       },
      //                   //       group: "chat_id",
      //                   //       plain: true,
      //                   // }),
      //                   [Op.in]: [Sequelize.literal(`Select MAX(message_id) from messages where fromUser_id = ${1} or toUser_id = ${1} group by chat_id`)],
      //             },
      //       },
      //       include: [
      //             {
      //                   model: User,
      //                   where: {
      //                         [Op.not]: { user_id: 1 },
      //                   },
      //                   attributes: [],
      //                   // attributes: ["name", "mobile", "user_id"],
      //                   as: "fromKey",
      //                   required: false,
      //                   on: {
      //                         user_id: Sequelize.or([Sequelize.col("Message.fromUser_id"), Sequelize.col("Message.toUser_id")]),
      //                   },
      //             },
      //       ],
      //       raw: true,
      // })

      //       .then((res) => {
      //             console.table(res);
      //       })
      //       .catch((err) => {
      //             console.log(err);
      //       });
});
