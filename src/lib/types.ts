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

export interface IRequestedUser {
    id : string;
    user : {
        cover : string;
        id : string;
        isPrivate : string;
        name : string;
        picture : string;
        surname : string;
    }
}

export interface IAccount extends Omit<IUser, "login" | "password"> {
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
    likes : IUser[];
    title : string;
    picture : string;
    isLiked : boolean;
}

export interface IContextType {
    account : IWideUser;
    setAccount : (user: IWideUser) => void;
}

export interface IContextTypeRequests {
    handleDataRequests : (requests: IRequestedUser[]) => void;
}

export interface IContextTypeAccount {
    account : IAccount;
    setAccount : (account: IAccount) => void;
}

export interface IAccountProps {
    account : IAccount;
    setAccount : (account: IAccount) => void;
}

export type InputUser = Omit<IUser, "id" | "isPravite" | "cover" | "picture">

export type ILogin = Omit<IUser, "id" | "name" | "surname" | "isPravite" | "cover" | "picture">