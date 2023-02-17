import User from "../Models/User";
import express from "express";
import ChatGroup from "../Models/ChatGroup";
import { Op } from "sequelize";
import Message from "../Models/Message";
import sequelize from "../config/db";

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
                        res.send({ message: "Successfully Login", status: true, data: users });
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
      change_password: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log(req.body);
            
            if (req.body?.mobile && req.body.password && req.body.newPassword) {
                  console.log(req.body);

                  let mobile = req.body.mobile;
                  let password = req.body.password;
                  let newPassword = req.body.newPassword;

                  let users = await User.findOne({
                        where: {
                              mobile: mobile,
                              password: password,
                        },
                  });

                  console.log(users);
                  if (users) {

                       let isUpdated = await User.update({
                              password:newPassword
                        },{
                              where:{
                                    mobile:mobile,
                                    password:password
                              },

                        },
                        )
                        if(isUpdated?.length > 0){

                              let newData = await User.findOne({
                                    where:{
                                          mobile:mobile,
                                          password:newPassword
                                    }
                              })
                              res.send({ message: "Password changed successfully", status: true, data: newData });
                              
                              
                        }else{
                              
                              res.send({ message: "Something went wrong", status: false });

                        }
                        


                  } else {
                        res.send({ message: "User not found", status: false });
                  }
            } else {
                  res.send({ message: "Missing Argument", status: false });
            }
      },
      userList: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (req.body?.mobile) {
                  console.log(req.body);
                  let mobile = req.body.mobile;
                  let user = await User.findOne({
                        where: {
                              mobile,
                        },
                  });
                  if (!user) {
                        res.send({ message: "Unauthorized", status: false });
                  } else {
                        //  let usersList = sequelize.query(`Select * from users as u , chatGroup as cg , Messages as m where mobile != ${mobile}`)

                        let users = await sequelize.query(
                              `SELECT  m.message_id , m.chat_id , m.message , m.createdAt , u.user_id , u.name , u.mobile  from Messages as m 
                        JOIN chatGroup as cg on ( cg.chat_id = m.chat_id AND ( m.toUser_id = ${user?.user_id} OR m.fromUser_id = ${user?.user_id}) ) 
                        JOIN users as u ON ( (u.user_id = cg.toUser_id || u.user_id = cg.fromUser_id ) && u.user_id != ${user?.user_id} )
                        WHERE m.message_id IN ( SELECT MAX(message_id) FROM Messages WHERE fromUser_id = ${user?.user_id} OR toUser_id = ${user?.user_id} GROUP BY chat_id );`,

                              {
                                    raw: true,
                              }
                        );
                        // let users = await User.findAll({
                        //       where: {
                        //             [Op.not]:{
                        //                   mobile:mobile
                        //             }

                        //       },
                        // });

                        console.log(users[0]);
                        if (users) {
                              res.send({ message: "Successfully fetch user list", status: true, data: users[0] });
                        } else {
                              res.send({ message: "No data found", status: false });
                        }
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
                              attributes:{
                                    exclude:['password']
                              }
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
                                          let chatHistory = await Message.findAll({
                                                where: {
                                                      chat_id: chat_id,
                                                },
                                          });
                                          res.send({ message: "Success", status: true, chat_id, chatHistory , user:toUser});
                                    } else {
                                          chat_id = (Math.random() * Math.random() * 10 ** 20).toFixed(0);

                                          let newChat = await ChatGroup.create({
                                                chat_id: chat_id,
                                                toUser_id: toUser.user_id!,
                                                fromUser_id: fromUser.user_id!,
                                          });
                                          if (newChat) {
                                                res.send({ message: "Success", status: true, chat_id, chatHistory: [] , user:toUser   });
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

      message: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (req.body?.fromUser_id) {
                  console.log(req.body);

                  let fromUser_id = req.body.fromUser_id;
                  let toUser_id = req.body.toUser_id;
                  let message = req.body.message;
                  let chat_id = req.body.chat_id;

                  let saveMessage = await Message.create({
                        chat_id: chat_id,
                        message: message,
                        fromUser_id: fromUser_id,
                        toUser_id: toUser_id,
                  });

                  if (saveMessage) {
                        res.send({ message: "Success", status: true });
                  } else {
                        res.send({ message: "Unauthorize", status: false });
                  }
            } else {
                  res.send({ message: "Missing Argument", status: false });
            }
      },
};

export default UserController;
