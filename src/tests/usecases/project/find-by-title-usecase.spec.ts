import { faker } from "@faker-js/faker";
import { NotFoundError } from "../../../app/presentation/errors/not-found-error";
import { FindProjectByTitleUsecase } from "../../../app/usecases/project/find-by-title.usecase";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { Project } from "../../../domain/project";
import { InMemoryProjectRepository } from "../../repositories/inMemoryProjectRepository";

const makeSut = () => {
    const repository = new InMemoryProjectRepository();
    const sut = new FindProjectByTitleUsecase(repository);

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

describe("Find project by title", () => {
    it("should throw an error when no title is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("");

        expect(promise).rejects.toThrow(new MissingParamError("title"));
    });

    it("should throw an error when no project is founded", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(projectSpy.title);

        expect(promise).rejects.toThrow(new NotFoundError("project"));
    });

    it("should be able to find a project", async () => {
        const { sut, repository } = makeSut();
        const project = new Project(projectSpy);
        await repository.create(project);

        const promise = sut.execute(projectSpy.title);

        expect(promise).resolves.not.toThrow();
        expect(await promise).toStrictEqual(project.toJson(true));
    });
});
