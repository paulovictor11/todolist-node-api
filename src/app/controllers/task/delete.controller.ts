import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma-task-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { DeleteTaskUsecase } from "../../usecases/task/delete.usecase";

export class DeleteTaskController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaTaskRepository = new PrismaTaskRepository();
            const deleteTaskUsecase = new DeleteTaskUsecase(
                prismaTaskRepository
            );

            await deleteTaskUsecase.execute(Number(id));
            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
