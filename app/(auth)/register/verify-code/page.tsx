"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyPhoneCode, clearError } from "@/store/slices/registrationSlice";
import { RootState, AppDispatch } from "@/store";
import VerificationForm from "@/components/VerificationForm";
import { maskPhoneNumber } from "@/utils/phoneUtils";

export default function VerifyCodePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, phoneNumber, formData } = useSelector(
    (state: RootState) => state.registration
  );

  // Redirect if no form data
  useEffect(() => {
    if (!formData) {
      router.push("/register");
    }
  }, [formData, router]);

  const handleVerify = async (code: string) => {
    if (!phoneNumber) return;

    dispatch(clearError());

    const result = await dispatch(
      verifyPhoneCode({
        phone: phoneNumber,
        code: code,
      })
    );

    if (verifyPhoneCode.fulfilled.match(result)) {
      // ~Success
      router.push("/login");
    }
  };

  const handleResend = async () => {
    // TODO: this function
  };

  // Show loading or redirect if no data
  if (!formData) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Перенаправление...</p>
        </div>
      </div>
    );
  }

  const maskedPhone = maskPhoneNumber(phoneNumber);

  return (
    <div className="h-full w-full flex flex-col justify-start items-center">
      <div className="mx-auto w-full max-w-md">
        <VerificationForm
          maskedPhone={maskedPhone}
          onVerify={handleVerify}
          onResend={handleResend}
        />

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
            disabled={isLoading}
          >
            ← Вернуться к регистрации
          </button>
        </div>
      </div>
    </div>
  );
}
