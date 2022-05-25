import { Router } from "express";
import { LoginController } from "./app/controllers/auth/login.controller";

export const routes = Router();

// ! Authentication routes
routes.post("/login", new LoginController().handle);

// ! User routes

// ! Project routes

// ! Task routes
