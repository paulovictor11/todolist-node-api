import { NotFoundError } from "../../presentation/errors/not-found-error";
import { ITaskRepository } from "../../repositories/domain/task-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

export class DeleteTaskUsecase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(id: number): Promise<void> {
        if (!id) {
            throw new MissingParamError("task id");
        }

        const doesTaskExists = await this.taskRepository.findById(id);
        if (!doesTaskExists) {
            throw new NotFoundError("task");
        }

        await this.taskRepository.delete(id);
    }
}
