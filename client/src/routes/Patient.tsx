import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const Patient = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Initialize signaling using Socket.io
    socketRef.current = io('https://carenest-1.onrender.com'); // Your signaling server
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    setPeerConnection(pc);

    // Get local media stream (video and audio)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
      })
      .catch(error => console.error('Error accessing media devices:', error));

    // Handle incoming answer from doctor
    socketRef.current.on('answer', async (answer: RTCSessionDescriptionInit) => {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    // Handle incoming ICE candidates
    socketRef.current.on('ice-candidate', async (candidate: RTCIceCandidateInit) => {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    // Set the remote video stream when received
    pc.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('ice-candidate', event.candidate);
      }
    };

    // Send offer to doctor to initiate the call
    const startCall = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socketRef.current.emit('offer', offer);  // Send offer to the doctor
    };

    // Automatically start call when patient component loads
    startCall();

    return () => {
      pc.close();
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Patient Video Call</h1>
      <div>
        <video ref={localVideoRef} autoPlay muted playsInline style={{ width: '400px', height: '300px' }} />
        <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '400px', height: '300px' }} />
      </div>
    </div>
  );
};

export default Patient;
