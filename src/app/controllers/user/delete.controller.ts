import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { DeleteUserUsecase } from "../../usecases/user/delete.usecase";

export class DeleteUserController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaUserRepository = new PrismaUserRepository();
            const deleteUserController = new DeleteUserUsecase(
                prismaUserRepository
            );

            await deleteUserController.execute(Number(id));
            return new HttpResponse(response).ok();
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
