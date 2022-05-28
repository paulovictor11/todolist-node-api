import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
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
            return new HttpResponse(response).ok(user);
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
