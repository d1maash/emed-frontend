import React from "react";
import SystemCards from "./_components/SystemCards";
import StatCard from "./_components/StatCard";

const AdminSystemPage = () => {
  return (
    <div className="w-full @container">
      <div className="w-full h-max flex flex-col @lg:grid grid-cols-4 gap-4">
        <div className="w-full h-full border col-span-3 bg-white rounded-xl">
          <div className="w-full h-full flex justify-center items-center text-4xl md:text-6xl xl:text-8xl text-center font-extrabold p-4">
            Здесь могла быть ваша реклама
          </div>
        </div>
        <div className="w-full h-max gap-4 grid @container grid-cols-2 ">
          <StatCard
            title="Завершено"
            percent={66}
            value={100000}
            total={150000}
            change={75}
          />
          <StatCard
            title="Направлены в стационар"
            percent={66}
            value={100000}
            total={150000}
            change={750}
          />
        </div>
      </div>

      <SystemCards />
    </div>
  );
};

export default AdminSystemPage;
