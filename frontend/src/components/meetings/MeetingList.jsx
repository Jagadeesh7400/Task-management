"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";
import { Calendar, Clock, Users } from "lucide-react";

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      try {
        const response = await api.get("/meetings");
        setMeetings(response.data);
      } catch (err) {
        console.error("Error fetching meetings:", err);
        setError(err.message || "Failed to load meetings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [user]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <p>Loading meetings...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <div
          key={meeting._id}
          className="bg-white dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-md p-4"
        >
          <h3 className="text-lg font-semibold text-primary-color dark:text-secondary-color">
            {meeting.title}
          </h3>
          <p className="text-sm text-dark-color dark:text-light-color opacity-70">
            {meeting.description}
          </p>
          <div className="flex items-center mt-2">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{formatDate(meeting.startTime)} - {formatDate(meeting.endTime)}</span>
          </div>
          <div className="flex items-center mt-1">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span>
              Participants:{" "}
              {meeting.participants
                .map((participant) => participant.name)
                .join(", ")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingList;

