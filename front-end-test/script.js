import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js"

const socketHome = io('http://localhost:5550');
const socketUser = io('http://localhost:5550/user');