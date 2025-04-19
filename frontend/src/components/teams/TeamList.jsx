"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";
import { Users } from "lucide-react";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await api.get("/teams");
          if (user?.role !== 'admin') {
            // Filter teams to only include those where the user is a member
            const userTeams = response.data.filter(team =>
              team.members.some(member => member._id === user?.id)
            );
            setTeams(userTeams);
          } else {
            // If the user is an admin, show all teams
            setTeams(response.data);
          }
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError(err.message || "Failed to load teams.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [user]);

  if (loading) {
    return <p>Loading teams...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <div
          key={team._id}
          className="bg-white dark:bg-dark-color dark:bg-opacity-50 rounded-lg shadow-md p-4"
        >
          <h3 className="text-lg font-semibold text-primary-color dark:text-secondary-color">
            {team.name}
          </h3>
          <p className="text-sm text-dark-color dark:text-light-color opacity-70">
            {team.description}
          </p>
          <div className="flex items-center mt-2">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span>
              Members:
              {team.members.map((member) => member.name).join(", ")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
