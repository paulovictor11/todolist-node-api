import { NotFoundError } from "../../presentation/errors/not-found-error";
import { IProjectRepository } from "../../repositories/domain/project-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

export class DeleteProjectUsecase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(id: number): Promise<void> {
        if (!id) {
            throw new MissingParamError("project id");
        }

        const doesProjectExists = await this.projectRepository.findById(id);
        if (!doesProjectExists) {
            throw new NotFoundError("project");
        }

        await this.projectRepository.delete(id);
    }
}
