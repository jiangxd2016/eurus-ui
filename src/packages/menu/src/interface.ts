export interface Item {
  label?: string;
  key: string;
  icon?: string;
  children?: Item[];
  disabled?: boolean;
  className?: string;
  childHeight?: number; // 用于微调下拉高度,仅在mode为vertical时
}
