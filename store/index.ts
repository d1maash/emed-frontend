// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
// import registrationReducer from "./slices/registrationSlice";
import authReducer from "./slices/authSlice";
import recruitDashboardReducer from "./slices/recruitDashboardSlice";

export const store = configureStore({
  reducer: {
    // registration: registrationReducer,
    auth: authReducer,
    recruitDashboard: recruitDashboardReducer,
  },
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
