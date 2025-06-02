module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("Admin connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Admin disconnected:", socket.id);
    });
  });
};
