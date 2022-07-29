import type { InjectionKey, Slots } from 'vue';
import { getCurrentInstance, inject } from 'vue';
import type { Size } from './constants';
import { CLASS_PREFIX, GLOBAL_CONFIG_NAME, COMPONENT_PREFIX } from './constants';
import type { EurusOptions } from './types';
import type { EurusLang } from '@/packages/locale/interface';

export interface ConfigProvider {
  slots: Slots;
  prefixCls?: string;
  locale?: EurusLang;
  size?: Size;
  updateAtScroll?: boolean;
}

export const configProviderInjectionKey: InjectionKey<ConfigProvider>
  = Symbol('ArcoConfigProvider');

export const getComponentPrefix = (options?: EurusOptions) => {
  return options?.componentPrefix ?? COMPONENT_PREFIX;
};

export const getPrefixCls = (componentName?: string): string => {
  const instance = getCurrentInstance();
  const configProvider = inject(configProviderInjectionKey, undefined);

  const prefix
    = configProvider?.prefixCls
    ?? instance?.appContext.config.globalProperties[GLOBAL_CONFIG_NAME]
      ?.classPrefix
    ?? CLASS_PREFIX;
  if (componentName) {
    return `${prefix}-${componentName}`;
  }
  return prefix;
};
