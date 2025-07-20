import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getRecruitDashboard as getRecruitDashboardApi } from "@/api/recruit";

interface RecruitDashboardState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: RecruitDashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const getRecruitDashboard = createAsyncThunk(
  "recruitDashboard/getRecruitDashboard",
  async (access: string, { rejectWithValue }) => {
    try {
      const res = await getRecruitDashboardApi(access);
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Ошибка загрузки данных"
      );
    }
  }
);

const recruitDashboardSlice = createSlice({
  name: "recruitDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecruitDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecruitDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRecruitDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default recruitDashboardSlice.reducer;
