import { Task } from "../../../domain/task";
import { NotFoundError } from "../../presentation/errors/not-found-error";
import { ITaskRepository } from "../../repositories/domain/task-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

export class FindTaskByTitleUsecase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(title: string): Promise<Task> {
        if (!title) {
            throw new MissingParamError("title");
        }

        const doesTaskExists = await this.taskRepository.findByTitle(title);
        if (!doesTaskExists) {
            throw new NotFoundError("task");
        }

        return doesTaskExists;
    }
}
