import { faker } from "@faker-js/faker";
import { ListAllTasksUsecase } from "../../../app/usecases/task/list-all.usecase";
import { InMemoryTaskRepository } from "../../repositories/inMemoryTaskRepository";

const makeSut = () => {
    const repository = new InMemoryTaskRepository();
    const sut = new ListAllTasksUsecase(repository);

    return {
        repository,
        sut,
    };
};

const taskSpy = {
    id: faker.datatype.number(),
    title: faker.lorem.sentence(),
    projectId: faker.datatype.number(),
    assignedTo: faker.datatype.number(),
    completed: faker.datatype.boolean(),
};

describe("List all tasks usecase", () => {
    it("should be able to list all tasks", async () => {
        const { sut } = makeSut();
        const promise = sut.execute();

        expect(promise).resolves.not.toThrow();
    });
});
