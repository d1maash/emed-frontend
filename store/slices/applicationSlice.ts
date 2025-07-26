// store/slices/applicationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createApplicationByCoordinator as createApplicationApi,
  sendToMedical as sendToMedicalApi,
  getApplicationsList as getApplicationsListApi,
  getApplicationById as getApplicationByIdApi,
} from "@/api/application";

import { assignDoctor as assignDoctorApi } from "@/api/lmo";

import {
  ConscriptApplicationDetail,
  ConscriptApplicationList,
} from "@/types/application";
import { LMODetail, LMOList } from "@/types/lmo";

interface AssignedDoctorStatus {
  loading: boolean;
  error: string | null;
}

interface ApplicationState {
  applicationList: ConscriptApplicationList[] | null;
  currentApplication: ConscriptApplicationDetail | null;
  loading: boolean;
  error: string | null;
  sendingToMedical: boolean;
  sentToMedical: boolean;
}

const initialState: ApplicationState = {
  applicationList: null,
  currentApplication: null,
  loading: false,
  error: null,
  sendingToMedical: false,
  sentToMedical: false,
};

// Thunk для отправки на медосмотр
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

// ~ Оставляем
// Thunk для получения заявки по призывнику
export const getApplicationList = createAsyncThunk<
  ConscriptApplicationList[] | null,
  { search: string; access: string },
  { rejectValue: string }
>("application/getList", async ({ search, access }, { rejectWithValue }) => {
  try {
    const applications = await getApplicationsListApi(search, access);
    return applications.length > 0 ? applications : null;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const getApplicationById = createAsyncThunk<
  ConscriptApplicationDetail,
  {
    id: number;
    access: string;
  },
  { rejectValue: string }
>("application/getById", async ({ id, access }, { rejectWithValue }) => {
  try {
    const application = await getApplicationByIdApi(id, access);
    return application;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? "error.message" : "Unknown error"
    );
  }
});

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    clearApplicationList: (state) => {
      state.applicationList = null;
      state.error = null;
    },
    clearApplication: (state) => {
      state.currentApplication = null;
      state.error = null;
      state.sentToMedical = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // * Get application by id - gets ConscriptApplicationDetail.
      .addCase(getApplicationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplicationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentApplication = action.payload;
      })
      .addCase(getApplicationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // *Get application list - gets Application list. Can be used to search by iin of one user
      .addCase(getApplicationList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplicationList.fulfilled, (state, action) => {
        state.loading = false;
        state.applicationList = action.payload;
      })
      .addCase(getApplicationList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // *Send to medical - sends conscript to medical
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

export const {
  clearApplication,
  clearApplicationList,
  clearError,
  setCurrentApplication,
} = applicationSlice.actions;
export default applicationSlice.reducer;
