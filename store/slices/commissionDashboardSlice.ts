import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCommissionDashboard as getCommissionDashboardApi } from "@/api/commission";

interface CommissionDashboardResponse {
  profile: {
    name: string;
    position: string;
  };
  scheduled_hearings: CommissionHearingList[];
  current_hearings: CommissionHearingList[];
  pending_appeals: any[]; // TODO: go around and find out what will be the returned type
  stats: {
    scheduled_hearings: number;
    current_hearings: number;
    hearings_today: number;
    decisions_week: number;
    decisions_month: number;
    pending_appeals: number;
  };
  tasks: any[]; // TODO: same as with pending_appeals
  notifications_count: number;
}

interface CommissionDashboardState {
  data: any;
  current_hearings: CommissionHearingList[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommissionDashboardState = {
  data: null,
  current_hearings: null,
  loading: false,
  error: null,
};

export const getCommissionDashboard = createAsyncThunk(
  "commissionDashboard/getCommissionDashboard",
  async (access: string, { rejectWithValue }) => {
    try {
      const res = await getCommissionDashboardApi(access);
      return res as CommissionDashboardResponse;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Ошибка загрузки данных"
      );
    }
  }
);

const commissionDashboardSlice = createSlice({
  name: "commissionDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommissionDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommissionDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.current_hearings = action.payload.current_hearings;
      })
      .addCase(getCommissionDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default commissionDashboardSlice.reducer;
