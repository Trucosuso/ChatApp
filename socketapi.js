const io = require( "socket.io" )();
const socketapi = {
    io: io
};

// Socket logic
io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});


module.exports = socketapi;