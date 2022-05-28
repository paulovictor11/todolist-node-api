import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma-task-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { UpdateTaskUsecase } from "../../usecases/task/update,usecase";

export class UpdateTaskController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const { title, projectId, assignedTo } = request.body;

            const prismaTaskRepository = new PrismaTaskRepository();
            const updateTaskUsecase = new UpdateTaskUsecase(
                prismaTaskRepository
            );

            await updateTaskUsecase.execute(
                { title, projectId, assignedTo },
                Number(id)
            );
            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
