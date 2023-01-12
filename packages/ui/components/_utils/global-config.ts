import { getCurrentInstance, inject } from 'vue';
import { CLASS_PREFIX, configProviderInjectionKey, GLOBAL_CONFIG_NAME } from './constants';

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
