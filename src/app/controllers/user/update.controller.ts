import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { UpdateUserUsecase } from "../../usecases/user/update.usecase";

export class UpdateUserController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const { name, email } = request.body;

            const prismaUserRepository = new PrismaUserRepository();
            const updateUserUsecase = new UpdateUserUsecase(
                prismaUserRepository
            );

            await updateUserUsecase.execute({ name, email }, Number(id));
            return new HttpResponse(response).ok();
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
