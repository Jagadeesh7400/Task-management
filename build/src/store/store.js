"use client"

import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/store/authSlice'
import tasksReducer from '@/store/tasksSlice'
import teamReducer from '@/store/teamSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
        teams: teamReducer
  },
})

export default store
