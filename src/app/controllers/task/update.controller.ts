import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma-task-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
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
            return new HttpResponse(response).ok();
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
