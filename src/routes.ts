import { Router } from "express";
import { LoginController } from "./app/controllers/auth/login.controller";
import { CreateUserController } from "./app/controllers/user/create.controller";
import { FindUserByIdController } from "./app/controllers/user/find-by-id.controller";
import { ListAllUserscontroller } from "./app/controllers/user/list-all.controller";

export const routes = Router();

// ! Authentication routes
routes.post("/login", new LoginController().handle);

// ! User routes
routes
    .route("/users")
    .get(new ListAllUserscontroller().handle)
    .post(new CreateUserController().handle);

routes.route("/user/:id").get(new FindUserByIdController().handle);

// ! Project routes

// ! Task routes
