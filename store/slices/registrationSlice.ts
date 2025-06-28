// src/store/slices/registrationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RegistrationData, VerificationData } from '@/types/registration'
import { sendVerificationCode, verifyCode } from '@/utils/api'

interface RegistrationState {
  formData: RegistrationData | null
  isLoading: boolean
  error: string | null
  isCodeSent: boolean
  phoneNumber: string
  verificationAttempts: number
}

const initialState: RegistrationState = {
  formData: null,
  isLoading: false,
  error: null,
  isCodeSent: false,
  phoneNumber: '',
  verificationAttempts: 0,
}

export const sendPhoneVerification = createAsyncThunk(
  'registration/sendPhoneVerification',
  async (registrationData: RegistrationData, { rejectWithValue }) => {
    try {
      const response = await sendVerificationCode(registrationData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка отправки кода')
    }
  }
)

export const verifyPhoneCode = createAsyncThunk(
  'registration/verifyPhoneCode',
  async (verificationData: VerificationData, { rejectWithValue }) => {
    try {
      const response = await verifyCode(verificationData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Неверный код')
    }
  }
)

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<RegistrationData>) => {
      state.formData = action.payload
      state.phoneNumber = action.payload.phone
    },
    clearError: (state) => {
      state.error = null
    },
    resetRegistration: (state) => {
      return initialState
    },
    incrementVerificationAttempts: (state) => {
      state.verificationAttempts += 1
    },
  },
  extraReducers: (builder) => {
    builder
      // Send verification code
      .addCase(sendPhoneVerification.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(sendPhoneVerification.fulfilled, (state) => {
        state.isLoading = false
        state.isCodeSent = true
      })
      .addCase(sendPhoneVerification.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Verify code
      .addCase(verifyPhoneCode.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyPhoneCode.fulfilled, (state) => {
        state.isLoading = false
        // Handle successful registration
      })
      .addCase(verifyPhoneCode.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.verificationAttempts += 1
      })
  },
})

export const { setFormData, clearError, resetRegistration, incrementVerificationAttempts } = registrationSlice.actions
export default registrationSlice.reducer
