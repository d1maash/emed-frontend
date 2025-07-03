import { Voenkomat } from "./types";

export const Voenkomats: Voenkomat[] = Array.from({ length: 12 }).map(
  (_, i) => ({
    id: i + 1,
    name: "Voenkomat" + i,
    address: "login.kz.army",
    contacts: "+77777777777",
  })
);
