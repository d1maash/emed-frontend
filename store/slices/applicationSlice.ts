// store/slices/applicationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createApplicationByCoordinator as createApplicationApi,
  sendToMedical as sendToMedicalApi,
  getApplicationByConscript as getApplicationByConscriptApi,
} from "@/api/application";

import {
  getLMOByConscript as getLMOByConscriptApi,
  getLMOById as getLMOByIdApi,
} from "@/api/lmo";

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

export const getApplicationByConscript = createAsyncThunk<
  Application | null,
  { search: string; access: string },
  { rejectValue: string }
>(
  "application/getByConscript",
  async ({ search, access }, { rejectWithValue }) => {
    try {
      const applications = await getApplicationByConscriptApi(search, access);

      return applications.length > 0 ? applications[0] : null;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const getLMOByConscript = createAsyncThunk<
  LMO | null,
  { search: string; access: string },
  { rejectValue: string }
>(
  "application/getLMOByConscript",
  async ({ search, access }, { rejectWithValue }) => {
    try {
      const lmos = await getLMOByConscriptApi(search, access);
      // Возвращаем первый LMO или null
      console.log(lmos[0]);
      return lmos.length > 0 ? lmos[0] : null;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const getLMOById = createAsyncThunk<
  LMO | null,
  { lmoId: number; access: string },
  { rejectValue: string }
>("application/getLMOById", async ({ lmoId, access }, { rejectWithValue }) => {
  try {
    const lmo = await getLMOByIdApi(lmoId, access);
    // LMO
    return lmo;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

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
      // Get application
      .addCase(getApplicationByConscript.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplicationByConscript.fulfilled, (state, action) => {
        state.loading = false;
        state.currentApplication = action.payload;
      })
      .addCase(getApplicationByConscript.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get LMO
      .addCase(getLMOByConscript.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLMOByConscript.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLMO = action.payload;
        if (!action.payload) {
          state.error = "ЛМО для призывника не найден";
        } else {
          state.error = null;
        }
      })
      .addCase(getLMOByConscript.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка поиска ЛМО";
        state.currentLMO = null;
      })
      // Get LMO by id
      .addCase(getLMOById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLMOById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLMO = action.payload;
        if (!action.payload) {
          state.error = "ЛМО для призывника не найден";
        } else {
          state.error = null;
        }
      })
      .addCase(getLMOById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка поиска ЛМО";
        state.currentLMO = null;
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
