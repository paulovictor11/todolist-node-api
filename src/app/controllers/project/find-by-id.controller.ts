import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { FindProjectByIdUsecase } from "../../usecases/project/find-by-id.usecase";

export class FindProjectByIdController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaProjectRepository = new PrismaProjectRepository();
            const findProjectByIdUsecase = new FindProjectByIdUsecase(
                prismaProjectRepository
            );

            const project = await findProjectByIdUsecase.execute(Number(id));
            return new HttpResponse(response).ok(project);
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
