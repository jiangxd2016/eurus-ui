import type { PropType } from 'vue';
import { computed, defineComponent, provide, reactive, ref, toRefs } from 'vue';
import './style.scss';

import SelectDown from '@/packages/select-down';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { selectKey } from '@/packages/_utils/constants';
import { ESelectDownProps } from '@/packages/select-down/src';
import { isArray } from '@/packages/_utils/is';
import { warn } from '@/packages/_utils/warn';
import useLocaleTransform from '@/packages/_hooks/localeTransform';
import { useFormValidate } from '@/packages/_utils/form';
import Option from './option';

export interface SelectOptionItem {
	value?: any;
	label?: string;
	disabled?: boolean;
	key?: string;
}

const ESelectProps = {
	...ESelectDownProps,
	options: {
		type: Array as PropType<SelectOptionItem[]>,
		default: () => [],
	},
};

export default defineComponent({
	name: 'ESelect',
	props: ESelectProps,
	emits: ['update:modelValue', 'change', 'clear', 'focus', 'blur'],
	setup(props, { emit, slots }) {
		if (__DEV__ && !props.multiple && isArray(props.modelValue)) {
			warn('ESelectDown', 'modelValue must be a string or number when multiple is false');
		}
		const prefixCls = getPrefixCls('select');

		const { formItemFields, validateEvent } = useFormValidate();

		const t = useLocaleTransform();
		const _value = ref(props.modelValue);
		const _options = ref<SelectOptionItem[]>([]);

		const selectDownRef = ref<typeof SelectDown>();

		const computedDisabled = computed(() => {
			return props.disabled || formItemFields?.disabled;
		});
		const computedLabel = computed(() => {
			const options = props.options.length > 0 ? props.options : _options.value;

			if (props.multiple) {
				return (
					options
						.filter((option: any) => {
							return Array.isArray(_value.value) && _value.value.includes(option.value);
						})
						.map((option: any) => option.label) ?? []
				);
			} else {
				return options.find((option: any) => option.value === _value.value)?.label ?? '';
			}
		});

		const computedPlaceholder = computed(() => {
			return props.placeholder ? props.placeholder : t('select.placeholder');
		});
		const selectItem = (value: any) => {
			if (props.multiple) {
				if (Array.isArray(_value.value)) {
					if (_value.value.includes(value)) {
						_value.value.splice(_value.value.indexOf(value), 1);
					} else {
						_value.value.push(value);
					}
				} else {
					_value.value = [value];
				}
			} else {
				_value.value = value;
			}
			validateEvent(_value.value);
			emit('update:modelValue', _value.value);
		};

		const setOption = (item: SelectOptionItem) => {
			if (props.options.length === 0) {
				_options.value.push(item);
			}
		};
		const onUpdateModelValue = (label: string) => {
			if (computedDisabled.value) {
				return;
			}
			const options = props.options.length > 0 ? props.options : _options.value;
			const value = options.find((option: SelectOptionItem) => option.label === label)?.value ?? '';
			selectItem(value);
		};

		const handleClear = () => {
			if (computedDisabled.value) {
				return;
			}
			_value.value = props.multiple ? [] : '';
			selectDownRef.value?.setModelValue(_value.value);
			validateEvent(_value.value);
			emit('update:modelValue', _value.value);
			emit('clear');
		};

		provide(selectKey, reactive({ ...toRefs(props), selectItem, setOption }));

		return () => {
			return (
				<SelectDown
					class={prefixCls}
					{...props}
					modelValue={computedLabel.value}
					placeholder={computedPlaceholder.value}
					disabled={computedDisabled.value}
					onUpdate:modelValue={onUpdateModelValue}
					ref={selectDownRef}
					onClear={handleClear}
				>
					{props.options.length > 0
						? props.options.map((option: any) => {
								return (
									<Option
										value={option.value}
										label={option.label}
										disabled={option.disabled}
										onClick={selectItem}
									/>
								);
						  })
						: slots.default && slots.default()}

					{/* TODO: need empty style  */}
				</SelectDown>
			);
		};
	},
});
