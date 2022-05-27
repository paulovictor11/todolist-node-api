import { Project } from "../../../domain/project";
import { NotFoundError } from "../../presentation/errors/not-found-error";
import { IProjectRepository } from "../../repositories/domain/project-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

export class FindProjectByIdUsecase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(id: number): Promise<Project> {
        if (!id) {
            throw new MissingParamError("project id");
        }

        const project = await this.projectRepository.findById(id);
        if (!project) {
            throw new NotFoundError("project");
        }

        return project;
    }
}
