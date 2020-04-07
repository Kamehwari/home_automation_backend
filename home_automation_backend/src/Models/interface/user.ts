
export interface IRegister {
    first_name ?: string;
    last_name ?:string;
    email ?:string;
    password ?:string;
}

export interface ILogin {
    email ?: string;
    password ?: string;
}

export interface ILogout {
    email ?: string;
    userId ?: string;
}

export interface IToken{
    email ?: string;
    userId ?: string;
}

export interface IDevice{
    name ?: string;
    state ?: boolean;
    created_by ?: string;
    _id?:string;
}