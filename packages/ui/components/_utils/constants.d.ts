import type { ExtractPropTypes, InjectionKey } from 'vue';
import type { Size } from '@/components/_utils/size';
export declare const COMPONENT_PREFIX = 'E';
export declare const CLASS_PREFIX = 'eu';
export declare const GLOBAL_CONFIG_NAME = '$eurus';
export interface ConfigProvider {
  prefixCls?: string;
}
export interface CheckboxGroupContext {
  name: string;
  value: Array<string | number>;
  disabled: boolean;
  handleChange: (value: Array<string | number | boolean>, e: Event) => void;
}
export declare const CheckboxGroupKey: InjectionKey<CheckboxGroupContext>;
export interface RadioGroupContext {
  name: string;
  value: string | number | boolean;
  disabled: boolean;
  handleChange: (value: string | number | boolean, e: Event) => void;
}
export declare const RadioGroupKey: InjectionKey<RadioGroupContext>;
export declare const configProviderInjectionKey: InjectionKey<ConfigProvider>;
export interface buttonGroupProviderType {
  size?: Size;
}
export declare const buttonGroupProviderTypeInjectionKey: InjectionKey<buttonGroupProviderType>;
export type FormProps = ExtractPropTypes<any>;
export type FormCtx = FormProps & {
  addFormItemField: (field: any) => void;
};
export declare const formCtxProviderInjectionKey: InjectionKey<FormCtx>;
export declare const formItemProviderInjectionKey: InjectionKey<any>;
