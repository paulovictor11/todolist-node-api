import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { UpdateUserPasswordUsecase } from "../../usecases/auth/update-password.usecase";
import { Encrypter } from "../../utils/helpers/encrypter";

export class UpdateUserPasswordController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const { password } = request.body;

            const prismaUserRepository = new PrismaUserRepository();
            const encrypter = new Encrypter();
            const updateUserPasswordUsecase = new UpdateUserPasswordUsecase(
                prismaUserRepository,
                encrypter
            );

            await updateUserPasswordUsecase.execute(password, Number(id));
            return new HttpResponse(response).ok();
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
