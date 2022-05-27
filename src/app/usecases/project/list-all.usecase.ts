import { Project } from "../../../domain/project";
import { IProjectRepository } from "../../repositories/domain/project-repository";

export class ListAllProjectsUsecase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(): Promise<Project[]> {
        return await this.projectRepository.listAll();
    }
}
