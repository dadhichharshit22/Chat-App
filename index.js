const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const {Server} = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

// Socket.io connection
io.on("connection",(socket)=>{
    console.log("A new user has connected",socket.id);
    socket.on("user-message",(message)=>{
        console.log("A new User Message",message);
        io.emit("message",message);
    });
}) 

// frontend

app.use(express.static(path.resolve("./public")));

// Controller
app.get("/",(req,res)=>{
    return res.sendFile("./public/index.html");
});

// Server Listen at the port number 9000
server.listen(9000,()=>{console.log("Server is running at port number 9000")});