import { ListAllProjectsUsecase } from "../../../app/usecases/project/list-all.usecase";
import { InMemoryProjectRepository } from "../../repositories/inMemoryProjectRepository";

const makeSut = () => {
    const repository = new InMemoryProjectRepository();
    const sut = new ListAllProjectsUsecase(repository);

    return {
        repository,
        sut,
    };
};

describe("List all projects usecase", () => {
    it("should be able to list all the projects", () => {
        const { sut } = makeSut();
        const promise = sut.execute();

        expect(promise).resolves.not.toThrow();
    });
});
