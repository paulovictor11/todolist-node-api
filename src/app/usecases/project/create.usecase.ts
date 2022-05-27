import { Project } from "../../../domain/project";
import { IProjectRepository } from "../../repositories/domain/project-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

interface ICreateProjectUsecaseRequest {
    title: string;
    description?: string;
    userId: number;
}

export class CreateProjectUsecase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute({
        title,
        description,
        userId,
    }: ICreateProjectUsecaseRequest): Promise<void> {
        if (!title) {
            throw new MissingParamError("title");
        }

        if (!userId) {
            throw new MissingParamError("user id");
        }

        const project = new Project({ title, description, userId });
        await this.projectRepository.create(project);
    }
}
