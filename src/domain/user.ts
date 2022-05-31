interface IUserProps {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

export class User {
    constructor(private props: IUserProps) {}

    get id(): number | null {
        return this.props.id ?? null;
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
    }

    toJson(): IUser {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
        } as IUser;
    }
}
