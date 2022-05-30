import { Router } from "express";
import { LoginController } from "../app/controllers/auth/login.controller";
import { UpdateUserPasswordController } from "../app/controllers/auth/update-password.controller";
import { Authencicate } from "../app/middlewares/authenticate.middleware";

export const authRoutes = Router();

authRoutes.post("/login", new LoginController().handle);
authRoutes.post(
    "/update-password/:id",
    new Authencicate().handle,
    new UpdateUserPasswordController().handle
);
