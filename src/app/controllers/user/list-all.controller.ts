import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { ListAllUsersUsecase } from "../../usecases/user/list-all.usecase";

export class ListAllUserscontroller implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const prismaUserRepository = new PrismaUserRepository();
            const listAllUsersUsecase = new ListAllUsersUsecase(
                prismaUserRepository
            );

            const users = await listAllUsersUsecase.execute();
            return new HttpResponse(response).ok(users);
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
