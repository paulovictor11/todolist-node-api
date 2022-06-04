import { faker } from "@faker-js/faker";
import { NotFoundError } from "../../../app/presentation/errors/not-found-error";
import { FindProjectByIdUsecase } from "../../../app/usecases/project/find-by-id.usecase";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { Project } from "../../../domain/project";
import { InMemoryProjectRepository } from "../../repositories/inMemoryProjectRepository";

const makeSut = () => {
    const repository = new InMemoryProjectRepository();
    const sut = new FindProjectByIdUsecase(repository);

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

describe("Find project by id usecase", () => {
    it("should throw an error when no project id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(Number(""));

        expect(promise).rejects.toThrow(new MissingParamError("project id"));
    });

    it("should throw an error when no project is founded", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(projectSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("project"));
    });

    it("should be able to find a project", async () => {
        const { sut, repository } = makeSut();
        const project = new Project(projectSpy);
        await repository.create(project);

        const promise = sut.execute(projectSpy.id);

        expect(promise).resolves.not.toThrow();
        expect(await promise).toStrictEqual(project.toJson(true));
        expect((await promise).id).toBeTruthy();
        expect((await promise).description).toBeTruthy();
    });
});
