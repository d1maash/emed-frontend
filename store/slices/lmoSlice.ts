// store/slices/lmoSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getLMOList as getLMOListApi,
  getLMOById as getLMOByIdApi,
} from "@/api/lmo";

import { assignDoctor as assignDoctorApi } from "@/api/lmo";

import { LMODetail, LMOList } from "@/types/lmo";

interface AssignedDoctorStatus {
  loading: boolean;
  error: string | null;
}

interface LmoState {
  lmoList: LMOList[] | null;
  currentLMO: LMODetail | null;
  loading: boolean;
  error: string | null;
  assignedDoctorsStatus: Record<number, AssignedDoctorStatus>; // doctor_queue id → статус назначения
}

const initialState: LmoState = {
  lmoList: null,
  currentLMO: null,
  loading: false,
  error: null,
  assignedDoctorsStatus: {},
};

// Thunk для получения LMO по призывнику
export const getLMOList = createAsyncThunk<
  LMOList[] | null,
  { search: string; access: string },
  { rejectValue: string }
>("application/getLMOList", async ({ search, access }, { rejectWithValue }) => {
  try {
    const lmos = await getLMOListApi(search, access);
    // Возвращаем первый LMO или null
    return lmos;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

// Thunk для получения LMO по id
export const getLMOById = createAsyncThunk<
  LMODetail | null,
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
  { doctorId: number; queueId: number },
  { lmoId: number; doctorId: number; queueId: number; access: string },
  { rejectValue: string }
>(
  "application/assignDoctor",
  async ({ lmoId, doctorId, queueId, access }, { rejectWithValue }) => {
    try {
      return await assignDoctorApi(lmoId, doctorId, queueId, access);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Ошибка назначения доктора"
      );
    }
  }
);

const lmoSlice = createSlice({
  name: "lmo",
  initialState,
  reducers: {
    clearLMOList: (state) => {
      state.lmoList = null;
      state.error = null;
    },
    clearLMO: (state) => {
      state.currentLMO = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentLMO: (state, action) => {
      state.currentLMO = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // *Get LMO list - gets LMO list. Can be used to search by iin of one user.
      .addCase(getLMOList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLMOList.fulfilled, (state, action) => {
        state.loading = false;
        state.lmoList = action.payload;
        if (!action.payload) {
          state.error = "ЛМО не найдены";
        } else {
          state.error = null;
        }
      })
      .addCase(getLMOList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка поиска ЛМО";
        state.currentLMO = null;
      })
      // *Get LMO by id - gets LMODetail.
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
      // *Assign doctor
      .addCase(assignDoctorThunk.pending, (state, action) => {
        const queueId = action.meta.arg.queueId;
        state.assignedDoctorsStatus[queueId] = { loading: true, error: null };
      })
      .addCase(assignDoctorThunk.fulfilled, (state, action) => {
        const doctorId = action.meta.arg.doctorId;
        const queueId = action.meta.arg.queueId;
        if (!state.currentLMO) return;

        // Обновляем локально assigned_doctor_name и assigned_doctor с заглушкой
        const dqIndex = state.currentLMO.doctor_queue.findIndex(
          (dq) => dq.id === queueId
        );
        if (dqIndex !== -1) {
          // Можно оставить пустое assigned_doctor_name - обновить по актуальным данным из UI/запроса
          state.currentLMO.doctor_queue[dqIndex].assigned_doctor = {
            id: doctorId,
            full_name: "", // либо актуальное имя, если есть
          } as any;
          state.currentLMO.doctor_queue[dqIndex].assigned_doctor_name = "";
        }

        state.assignedDoctorsStatus[queueId] = {
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

export const { clearLMOList, clearError, clearLMO, setCurrentLMO } =
  lmoSlice.actions;
export default lmoSlice.reducer;
