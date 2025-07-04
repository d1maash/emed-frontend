export type interval = "Ежедневно" | "Еженедельно" | "Ежемесячно";

export interface Report {
  id: number;
  name: string;
  interval: interval;
  responsible: string;
  lastGeneration: Date;
}
