import type { ExtractPropTypes, InjectionKey, Ref } from 'vue';
import type { EMenuProps } from '../menu/src';
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
	updateAtScroll?: boolean;
}

export interface CheckboxGroupContext {
	name: string;
	value: Array<string | number | boolean>;
	disabled: boolean;
	handleChange: (value: Array<string | number | boolean>, e: Event) => void;
}

export const CheckboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('CheckboxGroupKey');

export interface RadioGroupContext {
	name: string;
	value: string | number | boolean | undefined;
	disabled: boolean | undefined;
	handleChange: (value: string | number | boolean | undefined, e: Event) => void;
}

export const RadioGroupKey: InjectionKey<RadioGroupContext> = Symbol('RadioGroupKey');

export const EurusConfigProviderKey: InjectionKey<ConfigProvider> = Symbol('EurusConfigProvider');

export interface buttonGroupProviderType {
	size?: Size;
}

export const buttonGroupKey: InjectionKey<buttonGroupProviderType> = Symbol('buttonGroupProvider');

export type SelectCtx = Partial<
	ExtractPropTypes<
		typeof ESelectDownProps & {
			selectItem: (val: any) => void;
			setOption: (item: SelectOptionItem) => void;
		}
	>
>;
export const selectKey: InjectionKey<SelectCtx> = Symbol('EurusSelectContextProvider');

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

export const formCtxKey: InjectionKey<FormCtx> = Symbol('EurusFormConfigProvider');
export const formItemKey: InjectionKey<formItemCtx> = Symbol('EurusFormItemContextProvider');

// Carousel Provider

export interface ICarouselItem {
	uid: number;
	transformItem: (index: number, activeIndex: number, isAnimate?: boolean) => void;
}

export interface CarouselProvider {
	offsetHeight: Ref<number>;
	offsetWidth: Ref<number>;
	oldActiveIndex: Ref<number>;
	itemReact: ICarouselItem[];
	isLoop: Ref<boolean>;
}

export const CarouselKey: InjectionKey<CarouselProvider> = Symbol('EurusCarouselProvider');

// message type
export const MESSAGE_TYPES = ['info', 'success', 'warning', 'error'] as const;
export type MessageType = (typeof MESSAGE_TYPES)[number];

// menu provider

// props
export type menuProps = ExtractPropTypes<typeof EMenuProps>;
export const MenuPropsKeys: InjectionKey<menuProps> = Symbol('EurusMenuProvider');

// flat
export const MenuFlatKeys: InjectionKey<any> = Symbol('EurusMenuFlatProvider');
export const MenuFlatChangeKeys: InjectionKey<any> = Symbol('EurusMenuFlatChangeProvider');

// selected
export const MenuSelectedKeys: InjectionKey<any> = Symbol('EurusMenuSelectedProvider');
export const MenuSelectedChangeKeys: InjectionKey<any> = Symbol('EurusMenuSelectedChangeProvider');

export const MenuSelectHoverKeys: InjectionKey<any> = Symbol('EurusMenuSelectHoverProvider');
