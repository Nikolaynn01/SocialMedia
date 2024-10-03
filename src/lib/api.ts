import axios from "axios";
import { ILogin, ILoginUpd, InputUser, IPassUpd, IResponse } from "./types";

const Axios = axios.create({
    baseURL : "http://localhost:4002",
    withCredentials : true
});

export const handleSignUp = async (user: InputUser): Promise<IResponse> => {
    const response = await Axios.post("/signup", user);
    return response.data;
}

export const handleSignIn = async (user: ILogin): Promise<IResponse> => {
    const response = await Axios.post("/login", user);
    return response.data;
}

export const handleVerify = async (): Promise<IResponse> => {
    const response = await Axios.get("/verify");
    return response.data;
}

export const handleLogout = async (): Promise<IResponse> => {
    const response = await Axios.post("/logout");
    return response.data;
}

export const handlePassUpd = async (data: IPassUpd): Promise<IResponse> => {
    const response = await Axios.patch("/update/password", data);
    return response.data;
}

export const handleLoginUpd = async (data: ILoginUpd): Promise<IResponse> => {
    const response = await Axios.patch("/update/login", data);
    return response.data
}

export const handlePicturUpload = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.patch("/profile/upload", data);
    return response.data;
}

export const handleBackgroundUpload = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.patch("/cover/upload", data);
    return response.data;
}

export const handleGetPosts = async (): Promise<IResponse> => {
    const response = await Axios.get("/posts");
    return response.data;
}

export const handlePostsCreation = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.post("/posts", data);
    return response.data;
}

export const handleSearch = async (text: string): Promise<IResponse> => {
    const response = await Axios.get("/search/" + text);
    return response.data;
}

export const handleSetAccount = async (): Promise<IResponse> => {
    const response = await Axios.patch("/account/set");
    return response.data;
}

export const handleGetAccount = async (id : string): Promise<IResponse> => {
    const response = await Axios.get("/account/" + id);
    return response.data;
}

export const handleSendFollow = async (id: string): Promise<IResponse> => {
    const response = await Axios.post("/account/follow/" + id);
    return response.data;
} 

export const handleUnfollow = async (id: string): Promise<IResponse> => {
    const response = await Axios.post("/account/unfollow/" + id);
    return response.data;
}

export const handleCancelRequest = async (id: string): Promise<IResponse> => {
    const response = await Axios.delete("/request/cancel/" + id);
    return response.data;
}

export const handleRequests = async (): Promise<IResponse> => {
    const response = await Axios.get("/requests");
    return response.data;
}

export const handleAcceptRequest = async (id: string): Promise<IResponse> => {
    const response = await Axios.patch("/requests/accept/" + id);
    return response.data;
}

export const handleDeclineRequest = async (id: string): Promise<IResponse> => {
    const response = await Axios.patch("/requests/decline/" + id);
    return response.data;
}