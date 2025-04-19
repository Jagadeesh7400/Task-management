"use client";

import React, { useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "react-hot-toast";

const TeamTable = ({ onEdit }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await api.get("/teams");
        setTeams(response.data);
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError(err.message || "Failed to load teams.");
        toast.error(err.message || "Failed to load teams.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/teams/${id}`);
      setTeams(teams.filter((team) => team._id !== id));
      toast.success("Team deleted successfully!");
    } catch (err) {
      console.error("Error deleting team:", err);
      toast.error(err.message || "Failed to delete team.");
    }
  };

  if (loading) {
    return <p>Loading teams...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td className="py-2 px-4 border-b">{team.name}</td>
              <td className="py-2 px-4 border-b">{team.description}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onEdit(team)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit className="inline-block" size={16} />
                </button>
                <button
                  onClick={() => handleDelete(team._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="inline-block" size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
