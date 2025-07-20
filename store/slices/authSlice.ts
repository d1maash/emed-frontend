import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  login as loginApi,
  getMe as getMeApi,
  ecpLogin as ecpLoginApi,
} from "@/api/auth";
import type { User } from "@/types/user";

interface AuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: User | null;
}

const initialState: AuthState = {
  access: null,
  refresh: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  user: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: { iin: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await loginApi(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Ошибка входа");
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (access: string, { rejectWithValue }) => {
    try {
      const res = await getMeApi(access);
      return res;
    } catch (err: any) {
      return rejectWithValue("Ошибка получения пользователя");
    }
  }
);

export const ecpLogin = createAsyncThunk(
  "auth/ecpLogin",
  async (
    data: { p12_base64: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await ecpLoginApi(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Ошибка входа по ЭЦП"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.error = null;
      state.user = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
    setTokens: (
      state,
      action: PayloadAction<{ access: string; refresh: string }>
    ) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.isAuthenticated = true;
    },
    rehydrateAuth: (state) => {
      const access =
        typeof window !== "undefined" ? localStorage.getItem("access") : null;
      const refresh =
        typeof window !== "undefined" ? localStorage.getItem("refresh") : null;
      if (access) {
        state.access = access;
        state.isAuthenticated = true;
      }
      if (refresh) {
        state.refresh = refresh;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.isAuthenticated = true;
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(ecpLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ecpLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })
      .addCase(ecpLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setTokens, rehydrateAuth } = authSlice.actions;
export default authSlice.reducer;
