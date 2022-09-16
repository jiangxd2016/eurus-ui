import type { InjectionKey, Slots, ExtractPropTypes } from 'vue';
import { getCurrentInstance, inject } from 'vue';
import type { Size } from './constants';
import { CLASS_PREFIX, GLOBAL_CONFIG_NAME, COMPONENT_PREFIX } from './constants';
import type { EurusOptions } from './types';
import type { EFormProps } from '@/packages/form/';

export interface ConfigProvider {
  slots: Slots;
  prefixCls?: string;
  locale?: string;
  size?: Size;
}

export const configProviderInjectionKey: InjectionKey<ConfigProvider>
  = Symbol('EurusConfigProvider');

export type FormProps = ExtractPropTypes<typeof EFormProps>;

export type FormCtx = FormProps & {
  addFormItemFIeld: (field: any ) => void;
};

export const formCtxProviderInjectionKey: InjectionKey<FormCtx> = Symbol('EurusFormConfigProvider');
export const formItemProviderInjectionKey: InjectionKey<any>
  = Symbol('EurusFormItemContextProvider');

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
