"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/services/api";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

const TeamForm = ({ team, onClose }) => {
  const [name, setName] = useState(team?.name || "");
  const [description, setDescription] = useState(team?.description || "");
  const [members, setMembers] = useState(team?.members || []); // Assuming team.members is an array of user IDs
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/admin/users"); // Adjust the API endpoint if needed
        setAvailableUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Failed to load users.");
        toast.error(err.message || "Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teamData = {
        name,
        description,
        members: members.map((member) => member._id), // Send only user IDs to the backend
      };

      if (team) {
        // Update existing team
        await api.put(`/teams/${team._id}`, teamData);
        toast.success("Team updated successfully!");
      } else {
        // Create new team
        await api.post("/teams", teamData);
        toast.success("Team created successfully!");
      }
      onClose(); // Close the modal after successful submission
    } catch (err) {
      console.error("Error creating/updating team:", err);
      toast.error(err.message || "Failed to save team.");
    }
  };

  const toggleMember = (user) => {
    // Check if the user is already selected
    const isSelected = members.some((member) => member._id === user._id);

    if (isSelected) {
      // Remove the user from the selected members
      setMembers(members.filter((member) => member._id !== user._id));
    } else {
      // Add the user to the selected members
      setMembers([...members, user]);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {team ? "Edit Team" : "Add Team"}
          </h3>
          <div className="mt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Members:</label>
                <div className="flex flex-wrap">
                  {availableUsers.map((user) => (
                    <div
                      key={user._id}
                      className={`mr-2 mb-2 py-1 px-3 rounded-full text-sm cursor-pointer ${
                        members.some((member) => member._id === user._id)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => toggleMember(user)}
                    >
                      {user.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="absolute top-0 right-0 p-2">
            <button onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamForm;
