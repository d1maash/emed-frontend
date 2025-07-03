import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

interface NavTabsProps {
  page: string;
  children: React.ReactNode;
  className?: ClassValue[] | ClassValue;
}

interface NavTabProps {
  page: string;
  active?: boolean;
  onClick: () => void;
  className?: ClassValue[] | ClassValue;
}

const NavTabs: React.FC<NavTabsProps> = ({ page, children, className }) => {
  return (
    <>
      <div
        className={cn(
          "hidden @[1000px]:flex rounded-lg bg-[--primary-60] p-1.5 gap-2  text-sm w-max",
          className
        )}
      >
        {children}
      </div>
      <Popover>
        <PopoverTrigger className="flex @[1000px]:hidden">
          <div className="flex rounded-lg bg-[--primary-60] p-1.5 gap-2  text-sm w-max">
            <div className="px-8 py-0.5 rounded-md transition bg-white">
              Выбор страницы
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-max flex flex-col @[1000px]:hidden bg-[--primary-60] gap-2 p-1.5 rounded-lg"
        >
          {children}
        </PopoverContent>
      </Popover>
    </>
  );
};

const NavTab: React.FC<NavTabProps> = ({
  page,
  active,
  onClick,
  className,
}) => {
  return (
    <button
      className={cn(
        "px-8 py-0.5 rounded-md transition text-sm",
        !!active ? "bg-white" : "text-white",
        className
      )}
      onClick={onClick}
    >
      {page}
    </button>
  );
};

export { NavTabs, NavTab };
