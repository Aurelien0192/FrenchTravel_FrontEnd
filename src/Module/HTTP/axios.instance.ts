import axios from "axios";

const token: string|null = sessionStorage.getItem("UserAuthentifiate")

export const getURL = () => {
    const { hostname } = window.location
    console.log(hostname)
    console.log("ok3")
    return hostname
}

getURL()


export const http = axios.create({
    baseURL:`http://${getURL()}:3001`,
    headers:{'Authorization': `Bearer ${token && JSON.parse(token).data.token}`}
})
