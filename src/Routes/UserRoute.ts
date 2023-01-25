import express from "express";
import UserController from "../Controller/UserController";



const Router = express.Router();



Router.post("/login", UserController.login);
Router.post("/signup", UserController.signup);

Router.post("/userList", UserController.userList);

Router.post("/chat", UserController.chat);

Router.post("/message", UserController.message)


export default Router
