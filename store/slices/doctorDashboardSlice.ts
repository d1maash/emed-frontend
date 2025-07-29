import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getDoctorDashboard as getDoctorDashboardApi } from "@/api/doctors";
import {
  DoctorDashboardLMO,
  GetActiveLMOsResponse,
  GetArchiveLMOsResponse,
} from "@/types/doctor";
import {
  GetActiveLMOs as GetActiveLMOsApi,
  GetArchiveLMOs as GetArchiveLMOsApi,
} from "@/api/lmo";

interface DoctorDashboardState {
  data: any;
  archiveLMOsList: DoctorDashboardLMO[] | null;
  activeLMOsList: DoctorDashboardLMO[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: DoctorDashboardState = {
  data: null,
  archiveLMOsList: null,
  activeLMOsList: null,
  loading: false,
  error: null,
};

export const getDoctorDashboard = createAsyncThunk(
  "doctorDashboard/getDoctorDashboard",
  async (access: string, { rejectWithValue }) => {
    try {
      const res = await getDoctorDashboardApi(access);
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Ошибка загрузки данных"
      );
    }
  }
);

export const getActiveLMOs = createAsyncThunk(
  "doctorDashboard/getActiveLMOs",
  async (access: string, { rejectWithValue }) => {
    try {
      const res = await GetActiveLMOsApi(access);
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Ошибка загрузки активных LMO"
      );
    }
  }
);

export const GetArchiveLMOs = createAsyncThunk(
  "doctorDashboard/getArchiveLMOs",
  async (access: string, { rejectWithValue }) => {
    try {
      const res = await GetArchiveLMOsApi(access);
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Ошибка загрузки архивных LMO"
      );
    }
  }
);

const doctorDashboardSlice = createSlice({
  name: "doctorDashboard",
  initialState,
  reducers: {
    clearActiveLMOsList: (state) => {
      state.activeLMOsList = null;
      state.error = null;
    },
    clearArchiveLMOsList: (state) => {
      state.archiveLMOsList = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctorDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDoctorDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // *Загрузка активных ЛМО
      .addCase(getActiveLMOs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActiveLMOs.fulfilled, (state, action) => {
        state.loading = false;
        state.activeLMOsList = action.payload.active_lmos;
      })
      .addCase(getActiveLMOs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // *Загрузка архивных ЛМО
      .addCase(GetArchiveLMOs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetArchiveLMOs.fulfilled, (state, action) => {
        state.loading = false;
        state.archiveLMOsList = action.payload.archive_lmos;
      })
      .addCase(GetArchiveLMOs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearActiveLMOsList, clearArchiveLMOsList, clearError } =
  doctorDashboardSlice.actions;
export default doctorDashboardSlice.reducer;
