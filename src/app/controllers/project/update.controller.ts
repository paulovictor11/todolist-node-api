import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { UpdateProjectUsecase } from "../../usecases/project/update.usecase";

export class UpdateProjectController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const { title, description, userId } = request.body;

            const prismaProjectRepository = new PrismaProjectRepository();
            const updateProjectUsecase = new UpdateProjectUsecase(
                prismaProjectRepository
            );

            await updateProjectUsecase.execute(
                { title, description, userId },
                Number(id)
            );

            return new HttpResponse(response).ok();
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
