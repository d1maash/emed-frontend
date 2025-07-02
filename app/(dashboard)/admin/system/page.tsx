import React from "react";
import SystemCards from "./_components/SystemCards";

const AdminSystemPage = () => {
  return (
    <div className="w-full @container">
      <div className="w-full h-max grid grid-cols-4 gap-4">
        <div className="w-full h-full border col-span-3 bg-white rounded-xl"></div>
        {/* Two rows status */}
        <div className="w-full h-max gap-4 grid ">
          <div className="border bg-white rounded-xl aspect-[35/32]"></div>
          <div className="border bg-white rounded-xl aspect-[35/32]"></div>
        </div>
      </div>
      <SystemCards />
    </div>
  );
};

export default AdminSystemPage;
