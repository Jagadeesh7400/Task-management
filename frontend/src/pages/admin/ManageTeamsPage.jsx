"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import TeamTable from "@/components/teams/TeamTable";
import TeamForm from "@/components/teams/TeamForm";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from "@/store/teamSlice";  // Adjust path
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";

const ManageTeamsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const dispatch = useDispatch();
  const { teamsList, loading, error } = useSelector((state) => state.teams);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleAddTeam = () => {
       if (user?.role !== 'admin') {
      toast.error("You are not authorized to perform this action.");
      return;
    }
    setSelectedTeam(null); // Clear any existing selected team
    setShowForm(true);
  };

  const handleEditTeam = (team) => {
       if (user?.role !== 'admin') {
      toast.error("You are not authorized to perform this action.");
      return;
    }
    setSelectedTeam(team);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedTeam(null);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p>Error loading teams: {error}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Teams</h1>
           {user?.role === 'admin' && (
        <button
          onClick={handleAddTeam}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          <Plus className="inline-block mr-2" size={20} />
          Add Team
        </button>
           )}
      </div>

      <TeamTable teams={teamsList} onEdit={handleEditTeam} />

      {showForm && (
        <TeamForm
          team={selectedTeam}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default ManageTeamsPage;
