import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
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
            return response.send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
