import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { DeleteProjectUsecase } from "../../usecases/project/delete.usecase";

export class DeleteProjectController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaProjectRepository = new PrismaProjectRepository();
            const deleteProjectUsecase = new DeleteProjectUsecase(
                prismaProjectRepository
            );

            await deleteProjectUsecase.execute(Number(id));
            return new HttpResponse(response).ok();
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
