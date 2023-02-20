function listen(io) {
  const pongNamespace = io.of("/pong");
  let readyPlayerCount = 0;
  pongNamespace.on("connection", (socket) => {
    let room;
    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayerCount / 2);
      socket.join(room);
      console.log("ready ", socket.id);
      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        pongNamespace.in(room).emit("startGame", socket.id);
      }
    });
    socket.on("paddleMoved", (data) => {
      socket.to(room).emit("paddleMoved", data);
    });
    socket.on("ballMoved", (ballData) => {
      socket.to(room).emit("ballMoved", ballData);
    });
    socket.on("disconnect", (reason) => {
      // readyPlayerCount--;
      console.log(`Client ${socket.id} disconnected ${reason}`);

      socket.leave(room);
    });
  });
}

module.exports = { listen };
