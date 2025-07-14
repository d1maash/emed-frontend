import SidebarRoute from "@/components/Sidebar/SidebarRoute";

export default function Home() {
  return (
    <div className="bg-black h-screen w-full flex justify-center items-center text-white">
      <h1>
        <p className="text-2xl font-bold text-center">Welcome!</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[--primary-90] rounded-xl mt-4">
            <SidebarRoute text="Check Admin Page" link="admin" />
          </div>
          <div className="bg-[--primary-90] rounded-xl mt-4">
            <SidebarRoute text="Check Login Page" link="login" />
          </div>
          <div className="bg-[--primary-90] rounded-xl mt-4">
            <SidebarRoute text="Check Recruit Page" link="recruit" />
          </div>
          <div className="bg-[--primary-90] rounded-xl mt-4">
            <SidebarRoute text="Check Commission Page" link="commission" />
          </div>
        </div>
      </h1>
    </div>
  );
}
