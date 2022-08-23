import type { Slots } from 'vue';

import type { EurusLang } from '@/packages/locale/interface';

export const EVENT_CODE = {
  tab: 'Tab',
  enter: 'Enter',
  space: 'Space',
  left: 'ArrowLeft', // 37
  up: 'ArrowUp', // 38
  right: 'ArrowRight', // 39
  down: 'ArrowDown', // 40
  esc: 'Escape',
  delete: 'Delete',
  backspace: 'Backspace',
  numpadEnter: 'NumpadEnter',
  pageUp: 'PageUp',
  pageDown: 'PageDown',
  home: 'Home',
  end: 'End',
};

export const COMPONENT_PREFIX = 'E';
export const CLASS_PREFIX = 'eu';
export const GLOBAL_CONFIG_NAME = '$eurus';

export const SIZES = ['mini', 'small', 'medium', 'large'] as const;
export type Size = typeof SIZES[number];

export interface ConfigProvider {
  slots: Slots;
  prefixCls?: string;
  locale?: EurusLang;
  size?: Size;
  updateAtScroll?: boolean;
}
