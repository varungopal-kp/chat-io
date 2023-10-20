module.exports = function (io) {
  let connectedUsers = {};

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const user = socket.handshake.query.user;
    if (user) {
      connectedUsers[user] = socket;
    }

    socket.on("send_msg", (socket) => {
      let broadcastUsers = [
        connectedUsers[socket.user],
        connectedUsers[socket.receiver],
      ].filter((_a) => _a);
      if (broadcastUsers.length) {
        const receiveData = {
          sender: socket.user,
          receiver: socket.receiver,
          message: socket.message,
          createdAt: new Date().toISOString(),
        };
        if (broadcastUsers.length == 2) {
          io.to(broadcastUsers[0].id)
            .to(broadcastUsers[1].id)
            .emit("receive_msg", receiveData);
        } else {
          io.to(broadcastUsers[0].id).emit("receive_msg", receiveData);
        }
      }
    });
  });
};
