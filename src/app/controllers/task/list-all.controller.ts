import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma-task-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { ListAllTasksUsecase } from "../../usecases/task/list-all.usecase";

export class ListAllTasksController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const prismaTaskRepository = new PrismaTaskRepository();
            const listAllTasksUsecase = new ListAllTasksUsecase(
                prismaTaskRepository
            );

            const tasks = await listAllTasksUsecase.execute();
            return new HttpResponse(response).ok(tasks);
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
