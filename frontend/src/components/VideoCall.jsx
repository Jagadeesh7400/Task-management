import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

const VideoCall = ({roomName, userName}) => {
  return (
    <JitsiMeeting
      roomName={roomName}
      configOverwrite={{
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        prejoinPageEnabled: false,
      }}
      interfaceConfigOverwrite={{
        filmStripOnly: false,
      }}
      userInfo={{
        displayName: userName
      }}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = "500px"; // Adjust height as needed
      }}
    />
  );
};

export default VideoCall;
