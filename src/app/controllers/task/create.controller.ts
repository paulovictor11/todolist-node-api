import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma-task-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { CreateTaskUsecase } from "../../usecases/task/create.usecase";

export class CreateTaskController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { title, projectId, assignedTo } = request.body;

            const prismaTaskRepository = new PrismaTaskRepository();
            const createTaskUsecase = new CreateTaskUsecase(
                prismaTaskRepository
            );

            await createTaskUsecase.execute({ title, projectId, assignedTo });
            return response.status(201).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
