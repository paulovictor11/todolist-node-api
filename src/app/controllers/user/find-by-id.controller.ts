import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { FindUserByIdUsecase } from "../../usecases/user/find-by-id.usecase";

export class FindUserByIdController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const prismaUserRepository = new PrismaUserRepository();
            const findUserByIdController = new FindUserByIdUsecase(
                prismaUserRepository
            );

            const user = await findUserByIdController.execute(Number(id));
            return response.send(user);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
