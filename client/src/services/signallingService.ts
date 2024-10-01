// src/services/signalingService.ts
import { io } from 'socket.io-client';

const socket = io('https://carenest-1.onrender.com'); // Adjust the URL based on your backend

export const startSignaling = (roomId: string) => {
    socket.emit('join-room', { roomId });

    // Handle user joined
    socket.on('user-joined', ({ socketId }) => {
        console.log(`User joined: ${socketId}`);
        // Handle logic for when a user joins
    });

    // Handle offer from peer
    socket.on('offer', ({ offer }) => {
        console.log('Received offer:', offer);
        // Handle the offer from the peer (e.g., set remote description)
    });

    // Handle answer from peer
    socket.on('answer', ({ answer }) => {
        console.log('Received answer:', answer);
        // Handle the answer from the peer (e.g., set remote description)
    });

    // Handle ICE candidates
    socket.on('ice-candidate', ({ candidate }) => {
        console.log('Received ICE candidate:', candidate);
        // Add the received ICE candidate to the peer connection
    });
};
