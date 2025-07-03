import { Podrazdeleniye } from "./types";

export const Podrazdeleniya: Podrazdeleniye[] = Array.from({ length: 12 }).map(
  (_, i) => ({
    id: i + 1,
    name: "Podrazdeleniye " + i,
    structure: "lorem ipsum",
    code: "login.kz.army",
  })
);
