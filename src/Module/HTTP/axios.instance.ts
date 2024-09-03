import axios from "axios";

const token: string|null = sessionStorage.getItem("UserAuthentifiate")

export const getURL = () => {
    const { hostname } = window.location
    return hostname
}

export const http = axios.create({
    baseURL:`http://${getURL()}:3001`,
    headers:{'Authorization': `Bearer ${token && JSON.parse(token).data.token}`}
})
