"use client"

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import tasksReducer from './tasksSlice'
import teamReducer from './teamSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
        teams: teamReducer
  },
})

export default store

    