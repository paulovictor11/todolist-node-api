import { Project } from "../../../domain/project";
import { NotFoundError } from "../../presentation/errors/not-found-error";
import { IProjectRepository } from "../../repositories/domain/project-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

export class FindProjectByTitleUsecase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(title: string): Promise<Project> {
        if (!title) {
            throw new MissingParamError("title");
        }

        const doesProjectExists = await this.projectRepository.findByTitle(
            title
        );
        if (!doesProjectExists) {
            throw new NotFoundError("project");
        }

        return doesProjectExists;
    }
}
