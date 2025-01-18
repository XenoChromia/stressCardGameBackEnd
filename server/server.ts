const express = require("express");
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your client's origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
  });

  // socket.on("sendMsg", (msg) => {
  //   console.log("Message received on server:", msg);

  //   io.emit("receiveMsg", msg);
  // });
});

app.get('/request/room', (req: any, res: any) => {
  const roomNumber = "some room";
  io.on("connection", socket => {
    socket.join(roomNumber);
  });

  res.send(roomNumber);
  return res.end();
})

app.get('/join/room', (req: any, res: any) => {
  const roomNumber = req.query.roomNumber;
  io.on("connection", socket => {
    socket.join(roomNumber);
  });



  res.send('Room requested');
  return res.end();
})






const PORT = 8192;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
