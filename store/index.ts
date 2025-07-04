// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import registrationReducer from './slices/registrationSlice'

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
})

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
