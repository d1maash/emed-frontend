// store/slices/searchSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  searchUser as searchUserApi,
  searchConscript as searchConscriptApi,
  searchCoordinator as searchCoordinatorApi,
  SearchUserParams,
} from "@/api/search";
import { User } from "@/types/user";

interface SearchState {
  searchResults: User | null;
  loading: boolean;
  error: string | null;
  lastSearchParams: SearchUserParams | null;
}

const initialState: SearchState = {
  searchResults: null,
  loading: false,
  error: null,
  lastSearchParams: null,
};

export const searchUser = createAsyncThunk(
  "search/searchUser",
  async (
    { params, access }: { params: SearchUserParams; access: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await searchUserApi(params, access);
      return { results: res, params };
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err.message ||
          "Ошибка поиска пользователя"
      );
    }
  }
);

export const searchConscript = createAsyncThunk(
  "search/searchConscript",
  async (
    { iin, access }: { iin: string; access: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await searchConscriptApi(iin, access);
      return { results: res, params: { iin, role: "conscript" as const } };
    } catch (err: any) {
      return rejectWithValue(err.message || "Призывник не найден");
    }
  }
);

export const searchCoordinator = createAsyncThunk(
  "search/searchCoordinator",
  async (
    { iin, access }: { iin: string; access: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await searchCoordinatorApi(iin, access);
      return { results: res, params: { iin, role: "coordinator" as const } };
    } catch (err: any) {
      return rejectWithValue(err.message || "Координатор не найден");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = null;
      state.error = null;
      state.lastSearchParams = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search user
      .addCase(searchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results;
        state.lastSearchParams = action.payload.params;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchResults = null;
      })
      // Search conscript
      .addCase(searchConscript.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchConscript.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results;
        state.lastSearchParams = action.payload.params;
      })
      .addCase(searchConscript.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchResults = null;
      })
      // Search coordinator
      .addCase(searchCoordinator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCoordinator.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results;
        state.lastSearchParams = action.payload.params;
      })
      .addCase(searchCoordinator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchResults = null;
      });
  },
});

export const { clearSearchResults, clearError } = searchSlice.actions;
export default searchSlice.reducer;
