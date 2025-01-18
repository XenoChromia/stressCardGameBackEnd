  const express = require('express');
  import http from 'http';
  import { Server } from 'socket.io';

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
      cors: {
        origin: '*', // Replace with your client's origin
        methods: ['GET', 'POST'],
      },
    });

  io.on('connection', (socket) => {
      // console.log('A user connected:', socket.id);

      // socket.on('disconnect', () => {
      //     console.log('A user disconnected:', socket.id);
      // });

      socket.on("sendMsg", (msg) => {
          console.log("Message received on server:", msg);

          io.emit("receiveMsg", msg);
      });

  });
  const PORT = 510334;
  server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
  });