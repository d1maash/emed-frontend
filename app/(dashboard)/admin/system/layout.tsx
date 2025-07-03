import PageNavigation from "./_components/PageNavigation";

interface AdminSystemLayoutProps {
  children: React.ReactNode;
}

const AdminSystemLayout: React.FC<AdminSystemLayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col gap-6 @container">
      <PageNavigation />
      {children}
    </div>
  );
};

export default AdminSystemLayout;
