import Logo from "@/components/Logo";
import Link from "next/link";
import { RegistrationForm } from "./_components/RegistrationForm";

const Register = () => {
  return (
    <div className="flex flex-col h-full max-h-[100vh]">
      <div className="sticky top-0 z-10 bg-white flex flex-col items-center sm:items-start pb-4">
        <Logo width={200} height={48} variant="blue" />
        <Link href="/login" className="mt-2 text-[15px]  hover:underline">
          У меня уже есть аккаунт
        </Link>
      </div>
      <RegistrationForm />
    </div>
  );
};

export default Register;
