interface ITaskProps {
    title: string;
    projectId: number;
    assignedTo: number;
    completed?: boolean;
}

export class Task {
    private props: ITaskProps;
    private _id?: number;

    get id(): number | null {
        return this._id ?? null;
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

    constructor(props: ITaskProps, id?: number) {
        this.props = props;
        this._id = id;
    }
}
