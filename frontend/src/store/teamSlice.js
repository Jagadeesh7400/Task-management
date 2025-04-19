"use client";

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/services/api'; // Adjust the path if necessary

// Async thunks for team operations
export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async () => {
    const response = await api.get('/teams'); // Or '/admin/teams' if you want ONLY all teams
    return response.data;
  }
);

export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async (teamData) => {
    const response = await api.post('/teams', teamData);
    return response.data;
  }
);

export const updateTeam = createAsyncThunk(
  'teams/updateTeam',
  async ({ id, teamData }) => {
    const response = await api.put(`/teams/${id}`, teamData);
    return response.data;
  }
);

export const deleteTeam = createAsyncThunk(
  'teams/deleteTeam',
  async (id) => {
    await api.delete(`/teams/${id}`);
    return id; // Return the ID for removal from the state
  }
);

const teamSlice = createSlice({
  name: 'teams',
  initialState: {
    teamsList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teamsList = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.teamsList.push(action.payload);
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        const updatedTeam = action.payload;
        state.teamsList = state.teamsList.map((team) =>
          team._id === updatedTeam._id ? updatedTeam : team
        );
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        const id = action.payload;
        state.teamsList = state.teamsList.filter((team) => team._id !== id);
      });
  },
});

export default teamSlice.reducer;
