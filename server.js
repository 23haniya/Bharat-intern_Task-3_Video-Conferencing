// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// Function to handle new socket connections
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // Handle chat message event
  socket.on('chatMessage', (message) => {
    // Broadcast the message to all connected sockets
    io.emit('chatMessage', message);
  });

  // Handle WebRTC signaling and video/audio interactions
  // Implement the necessary logic for WebRTC signaling, peer connections, etc.
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
