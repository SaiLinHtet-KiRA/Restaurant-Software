import { Router } from "express";
import AuthController from "./Auth.controller";

const route = Router();

route.post("/auth/login", AuthController.Login);

export default route;
