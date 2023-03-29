import type { RenderContent } from '@/packages/_utils';

export interface Item {
  label?: string;
  key: string;
  icon?: RenderContent;
  children?: Item[];
  disabled?: boolean;
  className?: string;
  childHeight?: number; // 用于微调下拉高度,仅在mode为vertical时
}
