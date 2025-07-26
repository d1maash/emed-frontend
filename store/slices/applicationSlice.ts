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

import { assignDoctor as assignDoctorApi } from "@/api/lmo";

import { Application, LMO } from "@/types/application";

interface AssignedDoctorStatus {
  loading: boolean;
  error: string | null;
}

interface ApplicationState {
  currentApplication: Application | null;
  currentLMO: LMO | null;
  loading: boolean;
  error: string | null;
  sendingToMedical: boolean;
  sentToMedical: boolean;
  assignedDoctorsStatus: Record<number, AssignedDoctorStatus>; // doctor_queue id → статус назначения
}

const initialState: ApplicationState = {
  currentApplication: null,
  currentLMO: null,
  loading: false,
  error: null,
  sendingToMedical: false,
  sentToMedical: false,
  assignedDoctorsStatus: {},
};

// Thunk для создания заявки
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

// Thunk для получения заявки по призывнику
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

// Thunk для получения LMO по призывнику
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
      return lmos.length > 0 ? lmos[0] : null;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Thunk для получения LMO по id
export const getLMOById = createAsyncThunk<
  LMO | null,
  { lmoId: number; access: string },
  { rejectValue: string }
>("application/getLMOById", async ({ lmoId, access }, { rejectWithValue }) => {
  try {
    const lmo = await getLMOByIdApi(lmoId, access);
    return lmo;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

// Thunk назначения доктора
export const assignDoctorThunk = createAsyncThunk<
  { doctorQueueId: number; doctorId: number },
  { lmoId: number; doctorId: number; queueId: number; access: string },
  { rejectValue: string }
>(
  "application/assignDoctor",
  async ({ lmoId, doctorId, queueId, access }, { rejectWithValue }) => {
    try {
      await assignDoctorApi(lmoId, doctorId, queueId, access);
      return { doctorQueueId: queueId, doctorId };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Ошибка назначения доктора"
      );
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    clearApplication: (state) => {
      state.currentApplication = null;
      state.currentLMO = null;
      state.error = null;
      state.sentToMedical = false;
      state.assignedDoctorsStatus = {};
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentLMO: (state) => {
      state.currentLMO = null;
      state.error = null;
      state.assignedDoctorsStatus = {};
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

      // Get LMO by conscript
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
      })

      // Assign doctor
      .addCase(assignDoctorThunk.pending, (state, action) => {
        const queueId = action.meta.arg.queueId;
        state.assignedDoctorsStatus[queueId] = { loading: true, error: null };
      })
      .addCase(assignDoctorThunk.fulfilled, (state, action) => {
        const { doctorQueueId, doctorId } = action.payload;
        if (!state.currentLMO) return;

        // Обновляем локально assigned_doctor_name и assigned_doctor с заглушкой
        const dqIndex = state.currentLMO.doctor_queue.findIndex(
          (dq) => dq.id === doctorQueueId
        );
        if (dqIndex !== -1) {
          // Можно оставить пустое assigned_doctor_name - обновить по актуальным данным из UI/запроса
          state.currentLMO.doctor_queue[dqIndex].assigned_doctor = {
            id: doctorId,
            full_name: "", // либо актуальное имя, если есть
          } as any;
          state.currentLMO.doctor_queue[dqIndex].assigned_doctor_name = "";
        }

        state.assignedDoctorsStatus[doctorQueueId] = {
          loading: false,
          error: null,
        };
      })
      .addCase(assignDoctorThunk.rejected, (state, action) => {
        const queueId = action.meta.arg.queueId;
        state.assignedDoctorsStatus[queueId] = {
          loading: false,
          error: action.payload || "Ошибка назначения доктора",
        };
      });
  },
});

export const { clearApplication, clearCurrentLMO, clearError } =
  applicationSlice.actions;
export default applicationSlice.reducer;
