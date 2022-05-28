import { Request, Response } from "express";
import { PrismaTaskRepository } from "../../../infra/database/prisma/repositories/prisma-task-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { FindTaskByTitleUsecase } from "../../usecases/task/find-by-title.usecase";

export class FindTaskByTitleController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { title } = request.body;

            const prismaTaskRepository = new PrismaTaskRepository();
            const findTaskByTitleUsecase = new FindTaskByTitleUsecase(
                prismaTaskRepository
            );

            const project = await findTaskByTitleUsecase.execute(title);
            return new HttpResponse(response).ok(project);
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
