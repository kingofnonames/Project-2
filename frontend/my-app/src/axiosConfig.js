import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";
export const api = axios.create({
        baseURL: "http://localhost:5000",
});
