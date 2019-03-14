export interface HeaderConfig {
  text: string;
  icon: string;
}

export interface ColumnConfig {
  key: string;
  type: string; 
}

export interface Config {
  multiSelect: boolean;
  columns: ColumnConfig[];
  header?: HeaderConfig[];
}