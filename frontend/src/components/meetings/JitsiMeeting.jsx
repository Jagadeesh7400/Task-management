
"use client"

import { useEffect } from 'react';

const JitsiMeeting = ({ roomId, userName }) => {
  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomId,
      width: '100%',
      height: 500,
      parentNode: document.querySelector('#jitsi-container'),
      userInfo: {
        displayName: userName
      }
    };

    const api = new JitsiMeetExternalAPI(domain, options);

    return () => {
      api?.dispose();
    };
  }, [roomId, userName]);

  return <div id="jitsi-container"></div>;
};

export default JitsiMeeting;
