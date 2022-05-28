import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma-task-repository";
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
            return response.send(tasks);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
