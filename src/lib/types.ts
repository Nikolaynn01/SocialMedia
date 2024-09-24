export interface IUser {
    id : string;
    name : string;
    surname : string;
    login : string;
    password : string;
    isPravite : boolean;
    cover : string;
    picture : string;
}

export interface IResponse {
    status : string;
    message? : string;
    payload? : string;
}

export type InputUser = Omit<IUser, "id" | "isPravite" | "cover" | "picture">

export type ILogin = Omit<IUser, "id" | "name" | "surname" | "isPravite" | "cover" | "picture">