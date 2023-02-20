const api = require("./api");
const server = require("http").createServer(api);
const sockets = require("./sockets");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = 3000;
server.listen(PORT);
console.log("Server is listening on port " + PORT);
sockets.listen(io);
