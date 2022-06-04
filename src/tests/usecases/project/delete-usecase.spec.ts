import { faker } from "@faker-js/faker";
import { NotFoundError } from "../../../app/presentation/errors/not-found-error";
import { DeleteProjectUsecase } from "../../../app/usecases/project/delete.usecase";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { Project } from "../../../domain/project";
import { InMemoryProjectRepository } from "../../repositories/inMemoryProjectRepository";

const makeSut = () => {
    const repository = new InMemoryProjectRepository();
    const sut = new DeleteProjectUsecase(repository);

    return {
        repository,
        sut,
    };
};

const projectSpy = {
    id: faker.datatype.number(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    userId: faker.datatype.number(),
    task: [],
};

describe("Delete project usecase", () => {
    it("should throw an error when no project id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(Number(""));

        expect(promise).rejects.toThrow(new MissingParamError("project id"));
    });

    it("should thrown an error when no project is founded", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(projectSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("project"));
    });

    it("should be able to delete a project", async () => {
        const { sut, repository } = makeSut();
        const project = new Project(projectSpy);
        await repository.create(project);

        const promise = sut.execute(projectSpy.id);

        expect(promise).resolves.not.toThrow();
        expect(await promise).toBeUndefined();
    });
});
