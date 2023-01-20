import User from "../Models/User";
import express from "express";
import ChatGroup from "../Models/ChatGroup";
import { Op } from "sequelize";

const UserController = {
      login: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (req.body?.mobile && req.body.password) {
                  console.log(req.body);

                  let mobile = req.body.mobile;
                  let password = req.body.password;

                  let users = await User.findOne({
                        where: {
                              mobile: mobile,
                              password: password,
                        },
                  });

                  console.log(users);
                  if (users) {
                        res.send({ message: "Successfully Login", status: true , user:users });
                  } else {
                        res.send({ message: "User not found", status: false });
                  }
            } else {
                  res.send({ message: "Missing Argument", status: false });
            }
      },
      signup: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (req.body?.mobile && req.body?.password && req.body?.name) {
                  console.log(req.body);

                  let mobile = req.body.mobile;
                  let password = req.body.password;
                  let name = req.body.name;
                  let users = await User.findOne({
                        where: {
                              mobile: mobile,
                        },
                  });

                  console.log(users);
                  if (users) {
                        res.send({ message: "User Already exist, please login", status: false });
                  } else {
                        let user = await User.create({
                              mobile: mobile,
                              name: name,
                              password: password,
                        });

                        res.send({ message: "Successfully Signup", status: true, data: user });
                  }
            } else {
                  res.send({ message: "Missing Argument", status: false });
            }
      },
      chat: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (req.body?.user_id && req.body?.mobile) {
                  console.log(req.body);

                  let user_id = req.body.user_id;
                  let mobile = req.body.mobile;

                  let fromUser = await User.findOne({
                        where: {
                              user_id: user_id,
                        },
                  });

                  if (fromUser) {
                        let toUser = await User.findOne({
                              where: {
                                    mobile: mobile,
                              },
                        });
                        if (toUser) {
                              console.log("toUser", toUser);
                              if (toUser.mobile != fromUser.mobile) {
                                    let chat_id: string;

                                    let chats = await ChatGroup.findOne({
                                          where: {
                                                [Op.or]: [
                                                      {
                                                            toUser_id: toUser.user_id,
                                                            fromUser_id: fromUser.user_id,
                                                      },
                                                      {
                                                            toUser_id: fromUser.user_id,
                                                            fromUser_id: toUser.user_id,
                                                      },
                                                ],
                                          },
                                    });

                                    if (chats) {
                                          chat_id = chats.chat_id;
                                          res.send({ message: "Success", status: true, chat_id });
                                    } else {
                                          chat_id = (Math.random() * Math.random() * 10 ** 20).toFixed(0);

                                          let newChat = await ChatGroup.create({
                                                chat_id: chat_id,
                                                toUser_id: toUser.user_id!,
                                                fromUser_id: fromUser.user_id!,
                                          });
                                          if (newChat) {
                                                res.send({ message: "Success", status: true, chat_id });
                                          } else {
                                                
                                                res.send({ message: "Something went wrong", status: false });
                                          }
                                    }
                              } else {
                                    res.send({ message: "Cannot send to the same user", status: false });
                              }
                        } else {
                              res.send({ message: "Unable to find the user", status: false });
                        }
                  } else {
                        res.send({ message: "Unauthorize", status: false });
                  }
            } else {
                  res.send({ message: "Missing Argument", status: false });
            }
      },
};

export default UserController;
