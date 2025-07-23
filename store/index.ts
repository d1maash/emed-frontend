import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setTokens, logout } from "./slices/authSlice";
import recruitDashboardReducer from "./slices/recruitDashboardSlice";
import coordinatorDashboardReducer from "./slices/coordinatorDashboardSlice";
import searchReducer from "./slices/searchSlice";
import { api } from "../utils/api";
import { setupInterceptors } from "../utils/apiInterceptors";
import { refreshToken } from "../api/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recruitDashboard: recruitDashboardReducer,
    coordinatorDashboard: coordinatorDashboardReducer,
    search: searchReducer,
  },
});

// Настройка интерцепторов после создания store
setupInterceptors(
  api,
  (access: string, refresh?: string) => {
    store.dispatch(
      setTokens({
        access,
        refresh: refresh || store.getState().auth.refresh || "",
      })
    );
  },
  () => {
    store.dispatch(logout());
  },
  refreshToken
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
