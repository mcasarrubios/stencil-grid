export interface GridActionButton {
  key: string;
  icon?: string;
  text?: string;
}

export interface Config {
  gridActions: GridActionButton[];
}