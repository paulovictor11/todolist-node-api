interface ITaskProps {
    id?: number;
    title: string;
    projectId: number;
    assignedTo: number;
    completed?: boolean;
}

export class Task {
    constructor(private props: ITaskProps) {}

    get id(): number | null {
        return this.props.id ?? null;
    }

    get title(): string {
        return this.props.title;
    }

    get projectId(): number {
        return this.props.projectId;
    }

    get assignedTo(): number {
        return this.props.assignedTo;
    }

    get completed(): boolean {
        return this.props.completed ?? false;
    }
}
