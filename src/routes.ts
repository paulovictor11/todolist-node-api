import { Router } from "express";
import { LoginController } from "./app/controllers/auth/login.controller";
import { CreateProjectController } from "./app/controllers/project/create.controller";
import { DeleteProjectController } from "./app/controllers/project/delete.controller";
import { FindProjectByIdController } from "./app/controllers/project/find-by-id.controller";
import { ListAllProjectsController } from "./app/controllers/project/list-all.controller";
import { UpdateProjectController } from "./app/controllers/project/update.controller";
import { CreateTaskController } from "./app/controllers/task/create.controller";
import { DeleteTaskController } from "./app/controllers/task/delete.controller";
import { FindTaskByIdController } from "./app/controllers/task/find-by-id.controller";
import { ListAllTasksController } from "./app/controllers/task/list-all.controller";
import { UpdateTaskController } from "./app/controllers/task/update.controller";
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

routes
    .route("/project/:id")
    .get(new FindProjectByIdController().handle)
    .put(new UpdateProjectController().handle)
    .delete(new DeleteProjectController().handle);

// ! Task routes
routes
    .route("/tasks")
    .get(new ListAllTasksController().handle)
    .post(new CreateTaskController().handle);

routes
    .route("/task/:id")
    .get(new FindTaskByIdController().handle)
    .put(new UpdateTaskController().handle)
    .delete(new DeleteTaskController().handle);
