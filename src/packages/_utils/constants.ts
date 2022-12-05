import type { ExtractPropTypes, InjectionKey } from 'vue';
// import type { EFormProps } from '../form/src';
import type { Size } from '@/packages/_utils/size';

export const COMPONENT_PREFIX = 'E';
export const CLASS_PREFIX = 'eu';
export const GLOBAL_CONFIG_NAME = '$eurus';

export interface ConfigProvider {
  prefixCls?: string;
}

export const configProviderInjectionKey: InjectionKey<ConfigProvider>
  = Symbol('EurusConfigProvider');

export interface buttonGroupProviderType {
  size?: Size;
}

export const buttonGroupProviderTypeInjectionKey: InjectionKey<buttonGroupProviderType>
  = Symbol('buttonGroupProvider');

export type FormProps = ExtractPropTypes<any>;

export type FormCtx = FormProps & {
  addFormItemField: (field: any ) => void;
};

export const formCtxProviderInjectionKey: InjectionKey<FormCtx> = Symbol('EurusFormConfigProvider');
export const formItemProviderInjectionKey: InjectionKey<any>
  = Symbol('EurusFormItemContextProvider');
