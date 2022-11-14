import type { InjectionKey } from 'vue';
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

