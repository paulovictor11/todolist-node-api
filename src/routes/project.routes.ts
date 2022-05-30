import { Router } from "express";
import { CreateProjectController } from "../app/controllers/project/create.controller";
import { DeleteProjectController } from "../app/controllers/project/delete.controller";
import { FindProjectByIdController } from "../app/controllers/project/find-by-id.controller";
import { FindProjectByTitleController } from "../app/controllers/project/find-by-title.controller";
import { ListAllProjectsController } from "../app/controllers/project/list-all.controller";
import { UpdateProjectController } from "../app/controllers/project/update.controller";
import { Authencicate } from "../app/middlewares/authenticate.middleware";

export const projectRoutes = Router();

projectRoutes
    .route("/projects")
    .all(new Authencicate().handle)
    .get(new ListAllProjectsController().handle)
    .post(new CreateProjectController().handle);

projectRoutes
    .route("/project/:id")
    .all(new Authencicate().handle)
    .get(new FindProjectByIdController().handle)
    .put(new UpdateProjectController().handle)
    .delete(new DeleteProjectController().handle);

projectRoutes.post(
    "/projects/title",
    new FindProjectByTitleController().handle
);
