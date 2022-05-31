import { IProject } from "../../../domain/project";
import { IProjectRepository } from "../../repositories/domain/project-repository";

export class ListAllProjectsUsecase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(): Promise<IProject[]> {
        const projects = await this.projectRepository.listAll();
        return projects.map((project) => project.toJson());
    }
}
