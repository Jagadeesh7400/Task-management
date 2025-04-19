
"use client";
import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

interface JitsiMeetProps {
  roomName: string;
  displayName: string;
  password?: string;
}

const JitsiMeet: React.FC<JitsiMeetProps> = ({ roomName, displayName, password }) => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <div style={containerStyle}>
      <JitsiMeeting
        roomName={roomName}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          enableEmailInSubject: false,
          hideConferenceSubject: true,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: displayName,
        }}
        password={password}
      />
    </div>
  );
};

export default JitsiMeet;

    