import { ListAllUsersUsecase } from "../../../app/usecases/user/list-all.usecase";
import { InMemoryUserRepository } from "../../repositories/inMemoryUserRepository";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const sut = new ListAllUsersUsecase(repository);

    return {
        repository,
        sut,
    };
};

describe("List all users usecase", () => {
    it("should be able to list all the users", () => {
        const { sut } = makeSut();
        const promise = sut.execute();

        expect(promise).resolves.not.toThrow();
    });
});
