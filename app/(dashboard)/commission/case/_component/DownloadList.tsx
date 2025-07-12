import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Download } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export type File = {
  id: string;
  name: string;
  extension: string;
  size: string;
  src: string;
};

interface DownloadListProps {
  files: File[];
}

const DownloadList: React.FC<DownloadListProps> = ({ files }) => {
  const handleDownload = async (file: File) => {
    try {
      const response = await axios.get(file.src, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file.name}.${file.extension}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast("Ошибка скачивания файла", {
        description: "Попробуйте снова через минуту",
      });
    }
  };

  return (
    <>
      <div>
        <Separator
          className="bg-[--primary-30] mb-1"
          orientation="horizontal"
        />
        <h3 className="text-muted-foreground font-medium mb-1">Анализы</h3>
      </div>
      {files.length == 0 ? (
        <div>Прикрепленных файлов не найдено</div>
      ) : (
        <div className="flex flex-col gap-1">
          {files.map((file) => (
            <div
              className="flex gap-1 items-center cursor-pointer mr-auto"
              key={file.id}
              onClick={() => {
                handleDownload(file);
              }}
            >
              <Download
                size={28}
                strokeWidth={1.5}
                className="text-[--primary-90]"
              />
              <div className="flex flex-col gap-0.5">
                <h5 className="text-base text-[--primary-90] font-medium">
                  {file.name}.{file.extension}
                </h5>
                <p className="text-xs text-[--primary-60]">{file.size}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DownloadList;
