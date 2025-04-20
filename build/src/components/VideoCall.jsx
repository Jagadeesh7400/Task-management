
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

const VideoCall = ({ roomId }) => {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:5000", {
      transports: ['websocket'],
      upgrade: false
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join-room", roomId, socketRef.current.id);

        socketRef.current.on("user-connected", (userId) => {
          const peer = createPeer(userId, socketRef.current.id, stream);
          peersRef.current.push({
            peerID: userId,
            peer,
          });
          setPeers([...peersRef.current]);
        });

        socketRef.current.on("receiving-returned-signal", payload => {
          const item = peersRef.current.find(p => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
       // Clean up on unmount
       return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
  }, [roomId]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("sending-signal", { userId: userToSignal, signal, callerID });
    });

    return peer;
  }

  return (
    <div>
      <video ref={userVideo} autoPlay playsInline muted style={{width: "300px", height: "300px"}}/>
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer.peer} />;
      })}
    </div>
  );
};

function Video({ peer }) {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });

    peer.on("signal", signal => {
      console.log("Signal", signal)
    })

  }, [peer]);

  return (
    <video style={{width: "300px", height: "300px"}} muted playsInline autoPlay ref={ref} />
  );
}

export default VideoCall;
