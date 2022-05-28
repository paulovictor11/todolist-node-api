import { User } from "../../../domain/user";
import { NotFoundError } from "../../presentation/errors/not-found-error";
import { IUserRepository } from "../../repositories/domain/user-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

interface IUpdateUserUsecaseRequest {
    name: string;
    email: string;
}

export class UpdateUserUsecase {
    constructor(private userRepository: IUserRepository) {}

    async execute(
        { name, email }: IUpdateUserUsecaseRequest,
        id: number
    ): Promise<void> {
        if (!id) {
            throw new MissingParamError("user id");
        }

        const doesUserExists = await this.userRepository.findById(id);
        if (!doesUserExists) {
            throw new NotFoundError("user");
        }

        const user = new User({
            id,
            name,
            email,
            password: doesUserExists.password,
        });
        await this.userRepository.update(user, id);
    }
}
