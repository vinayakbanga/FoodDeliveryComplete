const express = require("express")
const dotenv=require("dotenv")
const app=express();
const http = require('http');
const cookieParser=require('cookie-parser')
const path=require("path")
const Emitter = require('events')
// const socketIo=require('socket.io')
// const cors = require("cors");
const socketIo = require('socket.io'); // Import Socket.IO
const cors= require("cors")
//config
dotenv.config({path:'config/config.env'})
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const errorMiddleware = require("./middleware/error");

const server = http.createServer(app);
//route imports

const items=require("./routes/homeRoute")
const user=require("./routes/userRoute")
const order=require("./routes/orderRoute")
const payment=require("./routes/paymentRoute")

app.use("/api/v1",items)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)
app.use(express.static(path.join(__dirname,"../frontend/build")))
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})
// Middleware for Errors
app.use(errorMiddleware);

//emmiter
const eventEmitter=new Emitter();
app.set('eventEmitter',eventEmitter)

const io = socketIo(server, {
  cors: {
      origin: "http://localhost:3000", // Adjust this to match your client-side URL
      methods: ["GET", "POST","PUT"]
  }
}); // instance of socket.io

// Socket.IO setup
io.on('connection', (socket) => {
  console.log("connect");

  socket.on('joinOrderRoom',(roomName)=>{
    // console.log(roomName);
    socket.join(roomName)

  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Additional Socket.IO event handling here
});

eventEmitter.on('orderUpdated',(data)=>{
    io.to(data.id).emit('orderUpdated',data)


    
})
eventEmitter.on('orderPlaced',(data)=>{
  console.log(data);
  io.to('adminRoom').emit('orderPlaced',data)
})
module.exports = { app, server };