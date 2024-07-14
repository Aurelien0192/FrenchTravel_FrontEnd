import axios from "axios";

export const http = axios.create({
    baseURL:'localhost:3001'
})