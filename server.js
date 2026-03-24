const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

let waitingUser = null;
let users = {};
let lastMessageTime = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("find", () => {
    if (waitingUser) {
      users[socket.id] = waitingUser;
      users[waitingUser] = socket.id;

      io.to(socket.id).emit("connected");
      io.to(waitingUser).emit("connected");

      waitingUser = null;
    } else {
      waitingUser = socket.id;
      socket.emit("waiting");
    }
  });

  socket.on("message", (msg) => {
    if (!msg || msg.length > 200) return;

    const now = Date.now();
    if (now - (lastMessageTime[socket.id] || 0) < 1000) return;
    lastMessageTime[socket.id] = now;

    const partner = users[socket.id];
    if (partner) {
      io.to(partner).emit("message", msg);
    }
  });

  socket.on("skip", () => {
    const partner = users[socket.id];

    if (partner) {
      io.to(partner).emit("partner-disconnected");
      delete users[partner];
    }

    delete users[socket.id];
    socket.emit("waiting");

    if (!waitingUser) waitingUser = socket.id;
  });

  socket.on("disconnect", () => {
    const partner = users[socket.id];

    if (partner) {
      io.to(partner).emit("partner-disconnected");
      delete users[partner];
    }

    delete users[socket.id];

    if (waitingUser === socket.id) {
      waitingUser = null;
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
