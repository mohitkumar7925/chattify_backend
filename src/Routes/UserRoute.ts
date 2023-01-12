import express from "express";
import UserController from "../Controller/UserController";



const Router = express.Router();



Router.post("/login", UserController.login);
Router.post("/signup", UserController.signup);

Router.post("/chat", UserController.chat);

export default Router
