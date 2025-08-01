import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  CommissionDashboardResponse,
  getCommissionDashboard as getCommissionDashboardApi,
} from "@/api/commission";
import { CommissionHearingList } from "@/types/commission";

interface CommissionDashboardState {
  data: any;
  hearingList: CommissionHearingList[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommissionDashboardState = {
  data: null,
  hearingList: null,
  loading: false,
  error: null,
};

export const getCommissionDashboard = createAsyncThunk(
  "commissionDashboard/getCommissionDashboard",
  async (access: string, { rejectWithValue }) => {
    try {
      const res = await getCommissionDashboardApi(access);
      return res;
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
        state.hearingList = action.payload.current_hearings;
        state.data = action.payload;
      })
      .addCase(getCommissionDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default commissionDashboardSlice.reducer;
