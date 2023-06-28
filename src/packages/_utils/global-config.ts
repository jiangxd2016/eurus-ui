import type { App } from 'vue';
import { getCurrentInstance, inject } from 'vue';
import { CLASS_PREFIX, COMPONENT_PREFIX, EurusConfigProviderKey, GLOBAL_CONFIG_NAME } from './constants';
import type { EuOptions } from './types';

export const getPrefixCls = (componentName?: string): string => {
  const instance = getCurrentInstance();
  const configProvider = inject(EurusConfigProviderKey, undefined);

  const prefix = configProvider?.prefixCls ?? instance?.appContext.config.globalProperties[GLOBAL_CONFIG_NAME]?.classPrefix ?? CLASS_PREFIX;
  if (componentName) {
    return `${prefix}-${componentName}`;
  }
  return prefix;
};
export const getComponentPrefix = (options?: EuOptions) => {
  return options?.componentPrefix ?? COMPONENT_PREFIX;
};

export const setGlobalConfig = (app: App, options?: EuOptions): void => {
  if (options && options.classPrefix) {
    app.config.globalProperties[GLOBAL_CONFIG_NAME] = {
      ...(app.config.globalProperties[GLOBAL_CONFIG_NAME] ?? {}),
      classPrefix: options.classPrefix,
    };
  }
};
