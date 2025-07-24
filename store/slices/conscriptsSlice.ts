import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listConscripts as listConscriptsApi } from "@/api/conscripts";
import { User } from "@/types/user";

export const listConscripts = createAsyncThunk<
  User[],
  { search: string; access: string; isVerified?: boolean },
  { rejectValue: string }
>(
  "conscripts/list",
  async ({ search, access, isVerified }, { rejectWithValue }) => {
    try {
      return await listConscriptsApi(search, access, isVerified);
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err.message ||
          "Не удалось получить список"
      );
    }
  }
);

interface ConscriptsState {
  data: User[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ConscriptsState = {
  data: [],
  loading: false,
  error: null,
};

const conscriptsSlice = createSlice({
  name: "conscripts",
  initialState,
  reducers: {
    clearConscripts: (s) => {
      s.data = [];
      s.error = null;
    },
    clearError: (s) => {
      s.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(listConscripts.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(listConscripts.fulfilled, (s, a) => {
        s.loading = false;
        s.data = a.payload;
      })
      .addCase(listConscripts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
        s.data = null;
      });
  },
});

export const { clearConscripts } = conscriptsSlice.actions;
export default conscriptsSlice.reducer;
