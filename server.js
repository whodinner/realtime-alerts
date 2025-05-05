const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Trigger alert manually
app.get('/trigger-alert', (req, res) => {
  io.emit('alert', { message: '🚨 Real-time Alert Triggered!' });
  res.send('Alert sent to all connected admins');
});

// Log client connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
