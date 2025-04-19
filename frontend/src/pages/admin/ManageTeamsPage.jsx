"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import TeamTable from "@/components/teams/TeamTable";
import TeamForm from "@/components/teams/TeamForm";

const ManageTeamsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleAddTeam = () => {
    setSelectedTeam(null); // Clear any existing selected team
    setShowForm(true);
  };

  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedTeam(null);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Teams</h1>
        <button
          onClick={handleAddTeam}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          <Plus className="inline-block mr-2" size={20} />
          Add Team
        </button>
      </div>

      <TeamTable onEdit={handleEditTeam} />

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
