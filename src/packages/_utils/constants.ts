import type { ExtractPropTypes, InjectionKey } from 'vue';
import type { Size } from '@/packages/_utils/size';
import type { ESelectDownProps } from '@/packages/select-down/src';
import type { SelectOptionItem } from '@/packages/select/src';

export type language = 'zh-cn' | 'en-us';

export const COMPONENT_PREFIX = 'E';
export const CLASS_PREFIX = 'eu';
export const GLOBAL_CONFIG_NAME = '$eurus';

export interface ConfigProvider {
  prefixCls?: string;
  locale: language;
  size: Size;
  darkMode: boolean;
}

export interface CheckboxGroupContext {
  name: string;
  value: Array<string | number>;
  disabled: boolean;
  handleChange: (value: Array<string | number | boolean>, e: Event) => void;
}

export const CheckboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('CheckboxGroupKey');

export interface RadioGroupContext {
  name: string;
  value: string | number | boolean;
  disabled: boolean;
  handleChange: (value: string | number | boolean, e: Event) => void;
}

export const RadioGroupKey: InjectionKey<RadioGroupContext> = Symbol('RadioGroupKey');

export const configProviderInjectionKey: InjectionKey<ConfigProvider>
  = Symbol('EurusConfigProvider');

export interface buttonGroupProviderType {
  size?: Size;
}

export const buttonGroupProviderTypeInjectionKey: InjectionKey<buttonGroupProviderType>
  = Symbol('buttonGroupProvider');

export type SelectCtx = Partial<ExtractPropTypes<typeof ESelectDownProps & { selectItem: (val: any) => void; setOption: (item: SelectOptionItem) => void }>>;
export const selectProviderInjectionKey: InjectionKey<SelectCtx>
  = Symbol('EurusSelectContextProvider');

export type FormProps = ExtractPropTypes<any>;

export type FormCtx = FormProps & {
  addFormItemField: (field: any) => void;
};

export interface formItemCtx {
  disabled: boolean;
  validate: Function;
  clear: Function;
  focusTips: Function;
  reset: Function;
  triggerList: string[];
}

export const formCtxProviderInjectionKey: InjectionKey<FormCtx> = Symbol('EurusFormConfigProvider');
export const formItemProviderInjectionKey: InjectionKey<formItemCtx>
  = Symbol('EurusFormItemContextProvider');
