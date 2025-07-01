export interface AlertRow {
  id: string;
  name: string;
  role: string;
  alert: string;
  status: "В процессе" | "Важно" | "Устранено";
  checked: boolean;
}
