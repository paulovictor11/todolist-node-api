import { Router } from "express";
import { LoginController } from "./app/controllers/auth/login.controller";
import { CreateUserController } from "./app/controllers/user/create.controller";

export const routes = Router();

// ! Authentication routes
routes.post("/login", new LoginController().handle);

// ! User routes
routes.route("/users").post(new CreateUserController().handle);

// ! Project routes

// ! Task routes
