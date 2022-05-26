interface IUserProps {
    name: string;
    email: string;
    password: string;
}

export class User {
    private props: IUserProps;
    private _id?: number;

    get id(): number | null {
        return this._id ?? null;
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

    constructor(props: IUserProps, id?: number) {
        this.props = props;
        this._id = id;
    }
}
