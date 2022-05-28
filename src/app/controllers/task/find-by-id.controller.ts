import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma-task-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { FindTaskByIdUsecase } from "../../usecases/task/find-by-id.usecase";

export class FindTaskByIdController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaTaskRepository = new PrismaTaskRepository();
            const findTaskByIdUsecase = new FindTaskByIdUsecase(
                prismaTaskRepository
            );

            const task = findTaskByIdUsecase.execute(Number(id));
            return new HttpResponse(response).ok(task);
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
