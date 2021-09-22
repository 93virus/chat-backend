const express = require("express");
const app = express();

const server = require("http").createServer(app);

const cors = require("cors");
app.use(cors());

const io = require("socket.io")(server, {
    cors: { 
        origin: '*',
    }
});

io.configure(function () { 
    io.set("transports", ["xhr-polling"]); 
    io.set("polling duration", 10); 
  }); 
    

io.on("connection", (socket) => {
    console.log("What is Socket : ", socket);
    console.log("Socket is active to be connected");

    socket.on("chat", (payload) => {
        console.log("What is Payload ? : ", payload);
        io.emit("chat", payload);
    })
});

// server.listen(5000, () => console.log("Server is Listening at port 5000..."));