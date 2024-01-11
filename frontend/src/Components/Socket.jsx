import { io } from 'socket.io-client';
// ||'http://localhost:4000/'
const SOCKET_URL = 'https://fooddelivery-vywh.onrender.com/'
const socket = io(SOCKET_URL, { transports: ['websocket'] });

export default socket;
