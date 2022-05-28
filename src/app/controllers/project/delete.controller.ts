import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
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
            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
