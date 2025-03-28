
import {createServer} from 'http';
import express from 'express';
import path from 'path';
import { Server } from 'socket.io';


const app  = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve('./public')));

//socket.io
io.on("connection",(socket)=> {
    console.log("a user has connected",socket.id);
    socket.on('user message' , (message) => {
        // console.log("a new user message",message)
        // once the message has been reached from a client to server now server has to send it to all other clients
        io.emit("message",message)
    })
})


app.get("/",(req,res) => {
    res.sendFile('/public/index.html')
})

server.listen(9000,()=> {
    console.log(`listening on port 9000`)
});

