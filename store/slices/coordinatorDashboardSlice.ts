import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCoordinatorDashboard as getCoordinatorDashboardApi } from "@/api/coordinator";

interface CoordinatorDashboardState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: CoordinatorDashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const getCoordinatorDashboard = createAsyncThunk(
  "coordinatorDashboard/getCoordinatorDashboard",
  async (access: string, { rejectWithValue }) => {
    try {
      const res = await getCoordinatorDashboardApi(access);
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Ошибка загрузки данных"
      );
    }
  }
);

const coordinatorDashboardSlice = createSlice({
  name: "coordinatorDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoordinatorDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoordinatorDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCoordinatorDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default coordinatorDashboardSlice.reducer;
