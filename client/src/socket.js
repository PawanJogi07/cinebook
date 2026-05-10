import { io } from "socket.io-client"

const socket = io("https://cinebook-api-iifm.onrender.com")

export default socket