"use client";
import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerificationFormProps {
  maskedPhone: string;
  onVerify?: (code: string) => void;
  onResend?: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  maskedPhone,
  onVerify,
}) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6 && onVerify) {
      onVerify(otp);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Подтверждение</h2>
      <p className="mb-6 text-sm text-gray-700">
        Пожалуйста введите код отправленный на номер {maskedPhone}
      </p>
      <form onSubmit={handleVerify}>
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          containerClassName="justify-start mb-4"
        >
          <InputOTPGroup className="gap-2">
            {[...Array(6)].map((_, idx) => (
              <InputOTPSlot key={idx} index={idx} className="rounded-lg" />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <div className="mb-4 text-xs text-[#D2B03F]">
          Не получили SMS? Повторный запрос через {timer} секунд
        </div>
        <button
          className="w-full py-2 rounded-lg text-white text-base font-medium mt-2"
          style={{
            background: otp.length === 6 ? "#3476d8" : "#C7DBF6",
            cursor: otp.length === 6 ? "pointer" : "not-allowed",
          }}
          disabled={otp.length !== 6}
          type="submit"
        >
          Подтвердить
        </button>
      </form>
    </div>
  );
};

export default VerificationForm;
