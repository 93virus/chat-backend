const express = require("express");
const app = express();

const server = require("http").createServer(app);

// const cors = require("cors");
// app.use(cors());

const hostUrl = "https://chatjsfrontend.herokuapp.com";

const io = require("socket.io")(server
    , {
    cors: {    
        origin: "*",
        credentials: true  
    }
}
);

let members = [];

app.get("/", (req,res) => {
    res.send("Hello");
    console.log("Hello");
});

io.on("connection", (socket) => {
    console.log("What is Socket : ", socket);
    console.log("Socket is active to be connected");

    socket.on("chat", (payload) => {
        console.log("What is Payload ? : ", payload);
        io.emit("chat", payload);
    })

    socket.on("join", (payload) => {
        io.emit("join", payload);
        members.push(payload);
    })


});

server.listen(process.env.PORT || 5000, () => console.log("Server is Listening at port 5000..."));