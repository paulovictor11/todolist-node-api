import { faker } from "@faker-js/faker";
import { CreateProjectUsecase } from "../../../app/usecases/project/create.usecase";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { InMemoryProjectRepository } from "../../repositories/inMemoryProjectRepository";

const makeSut = () => {
    const repository = new InMemoryProjectRepository();
    const sut = new CreateProjectUsecase(repository);

    return {
        repository,
        sut,
    };
};

const projectSpy = {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    userId: faker.datatype.number(),
};

describe("Create project usecase", () => {
    it("should throw an error when no title is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ ...projectSpy, title: "" });

        expect(promise).rejects.toThrow(new MissingParamError("title"));
    });

    it("should throw an error when no user id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ ...projectSpy, userId: Number("") });

        expect(promise).rejects.toThrow(new MissingParamError("user id"));
    });

    it("should be able to create a project", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(projectSpy);

        expect(promise).resolves.not.toThrow();
        expect(await promise).toBeUndefined();
    });
});
