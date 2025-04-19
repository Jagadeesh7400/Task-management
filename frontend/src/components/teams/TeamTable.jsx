"use client";

import React from "react";
import { Edit, Trash } from "lucide-react";
import { useDispatch } from 'react-redux';
import { deleteTeam } from "@/store/teamSlice";
import { toast } from "react-hot-toast";

const TeamTable = ({ teams, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTeam(id)).unwrap(); // unwrap to catch errors
      toast.success("Team deleted successfully!");
    } catch (err) {
      console.error("Error deleting team:", err);
      toast.error(err.message || "Failed to delete team.");
    }
  };

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

    