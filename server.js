const express = require("express");
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server,  {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": "https://priceless-dijkstra-4e1b79.netlify.app", //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

app.get("/", (req,res) => {
    res.send("Hello");
})

io.on("connection", (socket) => {
    console.log("What is Socket : ", socket);
    console.log("Socket is active to be connected");

    socket.on("chat", (payload) => {
        console.log("What is Payload ? : ", payload);
        io.emit("chat", payload);
    })
});

server.listen(5000, () => console.log("Server is Listening at port 5000..."));