import { createApplicationByCoordinator as createApplicationByCoordinatorApi } from "@/api/application";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentApplication } from "../slices/applicationSlice";
import { setCurrentLMO } from "../slices/lmoSlice";
import { ConscriptApplicationDetail } from "@/types/application";
import { LMODetail } from "@/types/lmo";

export const createApplicationWithLMOByCoordinator = createAsyncThunk<
  { application: ConscriptApplicationDetail; lmo: LMODetail } | null,
  { iin: string; access: string },
  { rejectValue: string }
>(
  "app/createApplicationWithLMO",
  async ({ iin, access }, { dispatch, rejectWithValue }) => {
    try {
      const { application, lmo } = await createApplicationByCoordinatorApi(
        iin,
        access
      );
      dispatch(setCurrentApplication(application));
      dispatch(setCurrentLMO(lmo));

      return { application, lmo };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка создания"
      );
    }
  }
);
