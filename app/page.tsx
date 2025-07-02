import SidebarRoute from "@/components/Sidebar/SidebarRoute";

export default function Home() {
  return (
    <div className="bg-black h-screen w-full flex justify-center items-center text-white">
      <h1>
        Salam Rasul
        <div className="bg-[--primary-90] rounded-xl mt-4">
          <SidebarRoute text="Check Admin Page" link="admin" />
        </div>
      </h1>
    </div>
  );
}
