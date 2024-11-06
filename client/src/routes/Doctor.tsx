import React, { useEffect, useRef, useState } from 'react';
import { startSignaling } from '../services/signallingService';
import io from 'socket.io-client';

const Doctor = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io('https://carenest-1.onrender.com'); 
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    setPeerConnection(pc);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
      })
      .catch(error => console.error('Error accessing media devices:', error));

    socketRef.current.on('offer', async (offer: RTCSessionDescriptionInit) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socketRef.current.emit('answer', answer); 
    });

    socketRef.current.on('ice-candidate', async (candidate: RTCIceCandidateInit) => {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('ice-candidate', event.candidate);
      }
    };

    return () => {
      pc.close();
      socketRef.current.disconnect();
    };
  }, []);

  const startCall = async () => {
    if (!peerConnection) return;
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socketRef.current.emit('offer', offer);  
  };

  return (
    <div>
      <h1>Doctor Video Call</h1>
      <div>
        <video ref={localVideoRef} autoPlay muted playsInline style={{ width: '400px', height: '300px' }} />
        <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '400px', height: '300px' }} />
      </div>
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default Doctor;
