import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import SidebarRoute, { SidebarRouteProps } from "./SidebarRoute";

interface SidebarProps {
  routes: SidebarRouteProps[];
  onClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ routes, onClick }) => {
  return (
    <div
      className="flex flex-col md:w-80 lg:min-w-[360px] px-8 py-10"
      onClick={onClick}
    >
      <div className="w-full justify-start items-center pl-5">
        <Logo width={150} height={52} variant="white" />
      </div>
      <nav className="flex flex-col mt-8 md:mt-12">
        {routes.map((route) => (
          <SidebarRoute key={route.link} text={route.text} link={route.link} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
