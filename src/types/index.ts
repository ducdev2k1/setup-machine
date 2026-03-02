export interface Option {
  id: string;
  name: string;
  description: string;
  script: string;
  selected: boolean;
}

export type Category = "devTools" | "databases" | "utilities";
