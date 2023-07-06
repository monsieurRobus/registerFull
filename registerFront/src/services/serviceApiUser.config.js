import axios from "axios"
import { token } from "../utils/token"

const PROTOCOL = "http://"
const HOST = "localhost"
const PORT = 8000
const ENDPOINT = "/api/v1"

const APIHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token()}`,
}

export const APIuser = axios.create({
    baseURL: `${PROTOCOL}${HOST}:${PORT}${ENDPOINT}`,
    headers: APIHeaders,
    timeout: 600000,
})