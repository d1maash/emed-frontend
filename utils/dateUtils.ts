import { parseISO, format } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDateDmmmmYYYY = (isoString: string): string => {
  const date = parseISO(isoString);
  return format(date, "d MMMM yyyy", { locale: ru });
};
