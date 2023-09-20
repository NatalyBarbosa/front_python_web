import axios from "axios";
import { URL } from "../../const"

const token = localStorage.getItem("accessToken");
const headers: Record<string, string> = {
    "Content-Type": "application/json",
};
if (token) {
    headers["token"] = `${token}`;
}


export const api = axios.create({

    baseURL: URL,
    headers
})