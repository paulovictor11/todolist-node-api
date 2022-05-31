import { IUser } from "../../../domain/user";
import { IUserRepository } from "../../repositories/domain/user-repository";

export class ListAllUsersUsecase {
    constructor(private userRepository: IUserRepository) {}

    async execute(): Promise<IUser[]> {
        const users = await this.userRepository.listAll();
        return users.map((user) => user.toJson());
    }
}
