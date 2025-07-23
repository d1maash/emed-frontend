// store/slices/applicationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createApplicationByCoordinator as createApplicationApi,
  sendToMedical as sendToMedicalApi,
} from "@/api/application";

import {
  Application,
  CreateApplicationResponse,
  LMO,
} from "@/types/application";

interface ApplicationState {
  currentApplication: Application | null;
  currentLMO: LMO | null;
  loading: boolean;
  error: string | null;
  sendingToMedical: boolean;
  sentToMedical: boolean;
}

const initialState: ApplicationState = {
  currentApplication: null,
  currentLMO: null,
  loading: false,
  error: null,
  sendingToMedical: false,
  sentToMedical: false,
};

export const createApplicationByCoordinator = createAsyncThunk(
  "application/createByCoordinator",
  async (
    { iin, access }: { iin: string; access: string },
    { rejectWithValue }
  ) => {
    try {
      return await createApplicationApi(iin, access);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Ошибка создания заявки"
      );
    }
  }
);

export const sendToMedical = createAsyncThunk(
  "application/sendToMedical",
  async (
    { applicationId, access }: { applicationId: number; access: string },
    { rejectWithValue }
  ) => {
    try {
      return await sendToMedicalApi(applicationId, access);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Ошибка отправки на медосмотр"
      );
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    clearApplication: (state) => {
      state.currentApplication = null;
      state.currentLMO = null;
      state.error = null;
      state.sentToMedical = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create application
      .addCase(createApplicationByCoordinator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApplicationByCoordinator.fulfilled, (state, action) => {
        state.loading = false;
        state.currentApplication = action.payload.application;
        state.currentLMO = action.payload.lmo;
      })
      .addCase(createApplicationByCoordinator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Send to medical
      .addCase(sendToMedical.pending, (state) => {
        state.sendingToMedical = true;
        state.error = null;
      })
      .addCase(sendToMedical.fulfilled, (state) => {
        state.sendingToMedical = false;
        state.sentToMedical = true;
      })
      .addCase(sendToMedical.rejected, (state, action) => {
        state.sendingToMedical = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearApplication, clearError } = applicationSlice.actions;
export default applicationSlice.reducer;
