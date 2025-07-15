import { File } from "../../../case/_component/DownloadList";
// TODO: Find out file format which will be used

export type SignStatus = "Подписан" | "Не подписан" | "В ожидании";

export type Protocol = {
  id: string;
  fullname: string;
  date: string;
  decision: string;
  files: File[];
  status: SignStatus;
};
