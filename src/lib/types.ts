export interface IUser {
    id : string;
    name : string;
    surname : string;
    login : string;
    password : string;
    isPrivate : string;
    cover : string;
    picture : string;
}

export interface IAccount extends IUser {
    available : boolean;
    connection : {
        blockedMe : boolean,
        didIBlock : boolean,
        following : boolean,
        followsMe : boolean,
        requested : boolean
    };
    followers : IUser[];
    following : IUser[];
    posts : IPost[];
}

export interface IResponse {
    status : string;
    message? : string;
    payload? : unknown;
    user?:IWideUser;
}

export interface IWideUser extends IUser {
    followers : IUser[];
    following : IUser[];
}

export interface IContextType {
    account : IWideUser;
    setAccount : (user : IWideUser) => void;
}

export interface IPassUpd {
    old : string;
    newpwd : string;
}

export interface ILoginUpd {
    password : string;
    login : string;
}

export interface IPost {
    id : number;
    title : string;
    picture : string;
}

export type InputUser = Omit<IUser, "id" | "isPravite" | "cover" | "picture">

export type ILogin = Omit<IUser, "id" | "name" | "surname" | "isPravite" | "cover" | "picture">