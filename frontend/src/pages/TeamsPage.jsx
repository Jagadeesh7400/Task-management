"use client";

import TeamList from "@/components/teams/TeamList";

const TeamsPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>
      <TeamList />
    </div>
  );
};

export default TeamsPage;
