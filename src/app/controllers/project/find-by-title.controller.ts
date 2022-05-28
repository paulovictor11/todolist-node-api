import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { FindProjectByTitleUsecase } from "../../usecases/project/find-by-title.usecase";

export class FindProjectByTitleController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { title } = request.body;

            const prismaProjectRepository = new PrismaProjectRepository();
            const findProjectByTitleUsecase = new FindProjectByTitleUsecase(
                prismaProjectRepository
            );

            const project = await findProjectByTitleUsecase.execute(title);
            return new HttpResponse(response).ok(project);
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
