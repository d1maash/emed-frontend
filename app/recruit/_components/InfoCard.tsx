import React from "react";
import { Bell, Phone, ArrowRight, ArrowRightLeft } from "lucide-react";
import MyButton from "@/components/myui/MyButton";

interface InfoCardProps {
  icon: "bell" | "phone" | "arrow";
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const iconMap = {
  bell: <Bell className="w-7 h-7 text-white" />,
  phone: <Phone className="w-7 h-7 text-white" />,
  arrow: <ArrowRightLeft className="w-7 h-7 text-white" />,
};

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div className="bg-[--primary-60] rounded-2xl p-6 sm:p-3 flex flex-col gap-2 justify-between  shadow-md">
      <div className="flex items-center gap-3">
        <div className="bg-[--primary-80] rounded-full p-2 flex items-center justify-center">
          {iconMap[icon]}
        </div>
        <div className="text-white font-semibold text-base">{title}</div>
      </div>
      <div className="text-white text-xs mb-2">{description}</div>
      <MyButton
        variant="outline"
        className="w-full bg-white border-none text-[--primary-60] font-semibold text-sm py-2"
        onClick={onClick}
      >
        {buttonText}
      </MyButton>
    </div>
  );
};

export default InfoCard;
