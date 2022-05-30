import { Router } from "express";
import { CreateUserController } from "../app/controllers/user/create.controller";
import { DeleteUserController } from "../app/controllers/user/delete.controller";
import { FindUserByIdController } from "../app/controllers/user/find-by-id.controller";
import { ListAllUserscontroller } from "../app/controllers/user/list-all.controller";
import { UpdateUserController } from "../app/controllers/user/update.controller";
import { Authencicate } from "../app/middlewares/authenticate.middleware";

export const userRoutes = Router();

userRoutes
    .route("/users")
    .get(new Authencicate().handle, new ListAllUserscontroller().handle)
    .post(new CreateUserController().handle);

userRoutes
    .route("/user/:id")
    .all(new Authencicate().handle)
    .get(new FindUserByIdController().handle)
    .put(new UpdateUserController().handle)
    .delete(new DeleteUserController().handle);
