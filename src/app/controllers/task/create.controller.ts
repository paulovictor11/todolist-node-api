import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma-task-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
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
            return new HttpResponse(response).created();
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
