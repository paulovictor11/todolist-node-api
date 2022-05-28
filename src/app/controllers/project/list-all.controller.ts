import { Request, Response } from "express";
import { PrismaProjectRepository } from "../../../infra/database/prisma/repositories/prisma-project-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { ListAllProjectsUsecase } from "../../usecases/project/list-all.usecase";

export class ListAllProjectsController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const prismaProjectRepository = new PrismaProjectRepository();
            const listAllProjectsUsecase = new ListAllProjectsUsecase(
                prismaProjectRepository
            );

            const projects = await listAllProjectsUsecase.execute();
            return new HttpResponse(response).ok(projects);
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
