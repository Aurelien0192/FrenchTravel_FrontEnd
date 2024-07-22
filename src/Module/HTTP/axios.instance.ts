import axios from "axios";

const token: string|null = sessionStorage.getItem("UserAuthentifiate")

export const http = axios.create({
    baseURL:'http://localhost:3001',
    headers:{'Authorization': `Bearer ${token && JSON.parse(token).data.token}`}
})

console.log(token && JSON.parse(token).data.token)