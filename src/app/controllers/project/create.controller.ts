import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { CreateProjectUsecase } from "../../usecases/project/create.usecase";

export class CreateProjectController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { title, description, userId } = request.body;

            const prismaProjectRepository = new PrismaProjectRepository();
            const createProjectUsecase = new CreateProjectUsecase(
                prismaProjectRepository
            );

            await createProjectUsecase.execute({ title, description, userId });
            return response.status(201).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
