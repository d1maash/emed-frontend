import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface DecorationCardProps {
  decorationPosition?: "top" | "bottom" | "center";
  decorationName?: "shield" | "calendar" | "file";
  colorVariant: "white" | "primary";
  children: React.ReactNode;
}

const DecorationCard: React.FC<DecorationCardProps> = ({
  decorationPosition,
  decorationName,
  colorVariant,
  children,
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden border rounded-xl min-w-12 pl-3 py-3",
        colorVariant == "white" && "bg-white",
        colorVariant == "primary" && "bg-[--primary-30]"
      )}
    >
      {children}
      <Image
        src={`/illustrations/${decorationName}.svg`}
        alt="decoration"
        width={55}
        height={70}
        className={cn(
          "absolute opacity-60",
          !decorationName && "hidden",
          decorationName == "calendar" &&
            "rounded-md border-x-2 border-b-2 border-[--primary-60]",
          decorationPosition == "top" && "top-0 -right-3",
          decorationPosition == "bottom" && "-bottom-3 -right-2",
          decorationPosition == "center" && "bottom-2 -right-3"
        )}
      />
    </div>
  );
};

export default DecorationCard;
