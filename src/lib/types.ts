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
    user?:IWideUser
}

export interface IWideUser extends IUser {
    followers : IUser[],
    followings : IUser[]
}

export interface IContextType {
    account : IWideUser,
    setAccount : (user : IWideUser) => void
}

export interface IPassUpd {
    old : string,
    newpwd : string
}

export interface ILoginUpd {
    password : string,
    login : string
}

export type InputUser = Omit<IUser, "id" | "isPravite" | "cover" | "picture">

export type ILogin = Omit<IUser, "id" | "name" | "surname" | "isPravite" | "cover" | "picture">