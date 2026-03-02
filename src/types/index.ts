export interface Option {
  id: string;
  name: string;
  description: string;
  script: string;
  selected: boolean;
}

export interface CategoryData {
  category: string;
  title: string;
  icon: string;
  items: Option[];
}
