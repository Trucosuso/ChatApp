const io = require( "socket.io" )();
const socketapi = {
    io: io
};

// Socket logic
io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("user registered", (username) => {
        socket.username = username;
        io.emit("chat message", {
            user: username,
            message: "has joined the chat"
        });
        socket.removeAllListeners("user registered");
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("chat message", (msg) => {
        msg.user = socket.username;
        io.emit("chat message", msg);
    });
});


module.exports = socketapi;