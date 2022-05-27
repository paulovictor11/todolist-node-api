import { Router } from "express";
import { LoginController } from "./app/controllers/auth/login.controller";
import { CreateProjectController } from "./app/controllers/project/create.controller";
import { ListAllProjectsController } from "./app/controllers/project/list-all.controller";
import { CreateUserController } from "./app/controllers/user/create.controller";
import { DeleteUserController } from "./app/controllers/user/delete.controller";
import { FindUserByIdController } from "./app/controllers/user/find-by-id.controller";
import { ListAllUserscontroller } from "./app/controllers/user/list-all.controller";
import { UpdateUserController } from "./app/controllers/user/update.controller";

export const routes = Router();

// ! Authentication routes
routes.post("/login", new LoginController().handle);

// ! User routes
routes
    .route("/users")
    .get(new ListAllUserscontroller().handle)
    .post(new CreateUserController().handle);

routes
    .route("/user/:id")
    .get(new FindUserByIdController().handle)
    .put(new UpdateUserController().handle)
    .delete(new DeleteUserController().handle);

// ! Project routes
routes
    .route("/projects")
    .get(new ListAllProjectsController().handle)
    .post(new CreateProjectController().handle);

// ! Task routes
