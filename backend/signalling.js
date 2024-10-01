export const setupWebRTCSignaling = (io) => {
    io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);
  
      socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`Client ${socket.id} joined room: ${roomId}`);
        socket.to(roomId).emit('user-joined', socket.id);
      });
  
      socket.on('offer', (data) => {
        socket.to(data.roomId).emit('offer', {
          offer: data.offer,
          from: socket.id,
        });
      });
  
      socket.on('answer', (data) => {
        socket.to(data.roomId).emit('answer', {
          answer: data.answer,
          from: socket.id,
        });
      });
  
      socket.on('ice-candidate', (data) => {
        socket.to(data.roomId).emit('ice-candidate', {
          candidate: data.candidate,
          from: socket.id,
        });
      });
  
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  };
  