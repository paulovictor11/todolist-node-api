import { Router } from "express";
import { CompleteTaskController } from "../app/controllers/task/complete.controller";
import { CreateTaskController } from "../app/controllers/task/create.controller";
import { DeleteTaskController } from "../app/controllers/task/delete.controller";
import { FindTaskByIdController } from "../app/controllers/task/find-by-id.controller";
import { FindTaskByTitleController } from "../app/controllers/task/find-by-title.controller";
import { ListAllTasksController } from "../app/controllers/task/list-all.controller";
import { UpdateTaskController } from "../app/controllers/task/update.controller";
import { Authencicate } from "../app/middlewares/authenticate.middleware";

export const taskRoutes = Router();

taskRoutes
    .route("/tasks")
    .all(new Authencicate().handle)
    .get(new ListAllTasksController().handle)
    .post(new CreateTaskController().handle);

taskRoutes
    .route("/task/:id")
    .all(new Authencicate().handle)
    .get(new FindTaskByIdController().handle)
    .put(new UpdateTaskController().handle)
    .delete(new DeleteTaskController().handle);

taskRoutes.post(
    "tasks/title",
    new Authencicate().handle,
    new FindTaskByTitleController().handle
);
taskRoutes.post(
    "tasks/complete/:id",
    new Authencicate().handle,
    new CompleteTaskController().handle
);
