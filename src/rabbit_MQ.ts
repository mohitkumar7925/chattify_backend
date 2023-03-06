import rabbit from "amqplib";

export default class Rabbit_MQ {
      static connection: rabbit.Connection;
      static channel: rabbit.Channel;

      static getClient() {
            return new Promise(async (resolve, reject) => {
                  try {
                        if (this.channel) {
                              console.log("___connection__exist");
                              return resolve(Rabbit_MQ);
                        }

                        this.connection = await rabbit.connect("amqp://guest:guest@localhost", {});
                        this.channel = await this.connection.createChannel();
                        return resolve(Rabbit_MQ);
                  } catch (error) {
                        console.log("error in rabbit mq", error);
                        return reject(error);
                  }
            });
      }
}
