"use client";

import { useState } from "react";
import MeetingList from "@/components/meetings/MeetingList";
import JitsiMeeting from "@/components/meetings/JitsiMeeting";
import { useAuth } from "@/hooks/useAuth";

const MeetingsPage = () => {
  const [roomId, setRoomId] = useState("testroom");
  const { user } = useAuth();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Meetings</h1>
      <MeetingList />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Join Meeting</h2>
        <JitsiMeeting roomId={roomId} userName={user?.name || "Guest"} />
      </div>
    </div>
  );
};

export default MeetingsPage;
