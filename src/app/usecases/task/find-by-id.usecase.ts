import { ITask } from "../../../domain/task";
import { NotFoundError } from "../../presentation/errors/not-found-error";
import { ITaskRepository } from "../../repositories/domain/task-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

export class FindTaskByIdUsecase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(id: number): Promise<ITask> {
        if (!id) {
            throw new MissingParamError("task id");
        }

        const doesTaskExists = await this.taskRepository.findById(id);
        if (!doesTaskExists) {
            throw new NotFoundError("task");
        }

        return doesTaskExists.toJson();
    }
}
