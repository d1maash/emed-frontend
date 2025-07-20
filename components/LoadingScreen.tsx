import { Loader2 } from "lucide-react";

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="animate-spin size-8 text-[--primary-90]" />
      <span className="text-lg font-medium text-[--primary-90]">
        Загрузка...
      </span>
    </div>
  </div>
);

export default LoadingScreen;
