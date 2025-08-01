import { getCommissionHearingDetailById as getCommissionHearingDetailByIdApi } from "@/api/commission";
import { CommissionHearingDetail } from "@/types/commission";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CommissionHearingState {
  currentHearing: CommissionHearingDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommissionHearingState = {
  currentHearing: null,
  loading: false,
  error: null,
};

// Thunk для получения Hearing по id
export const getCommissionHearingDetailById = createAsyncThunk<
  CommissionHearingDetail | null,
  { HearingId: string; access: string },
  { rejectValue: string }
>(
  "commissionHearing/getCommissionHearingDetailById",
  async ({ HearingId, access }, { rejectWithValue }) => {
    try {
      const hearing = await getCommissionHearingDetailByIdApi(
        access,
        HearingId
      );
      return hearing;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const commissionHearingSlice = createSlice({
  name: "commissionHearing",
  initialState,
  reducers: {
    clearHearing: (state) => {
      state.currentHearing = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentHearing: (state, action) => {
      state.currentHearing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // *Get Hearing ById
      .addCase(getCommissionHearingDetailById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommissionHearingDetailById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHearing = action.payload;
        if (!action.payload) {
          state.error = "Слушание не найдено";
        } else {
          state.error = null;
        }
      })
      .addCase(getCommissionHearingDetailById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка поиска Слушания";
        state.currentHearing = null;
      });
  },
});

export const { clearHearing, clearError, setCurrentHearing } =
  commissionHearingSlice.actions;
export default commissionHearingSlice.reducer;
