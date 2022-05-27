import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
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

            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
