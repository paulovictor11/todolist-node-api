import { User } from "../../../domain/user";
import { NotFoundError } from "../../presentation/errors/not-found-error";
import { IUserRepository } from "../../repositories/domain/user-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

export class FindUserByIdUsecase {
    constructor(private userRepository: IUserRepository) {}

    async execute(id: number): Promise<User> {
        if (!id) {
            throw new MissingParamError("user id");
        }

        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError("user");
        }

        return user;
    }
}
