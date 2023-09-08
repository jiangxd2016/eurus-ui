import type { PropType } from 'vue';
import { computed, defineComponent, inject, watchEffect } from 'vue';
import './style.scss';
import { isBoolean, isString } from '@/packages/_utils/is';
import EIcon from '@/packages/icons';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { CheckboxGroupKey } from '@/packages/_utils/constants';
import { warnOnce } from '@/packages/_utils/warn';

const ECheckboxProps = {
	modelValue: {
		type: [Boolean, String] as PropType<string | boolean>,
		default: false,
	},
	defaultChecked: {
		type: Boolean,
		default: false,
	},
	value: {
		type: [String, Number] as PropType<string | number>,
	},
	label: {
		type: String,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
};

export default defineComponent({
	name: 'ECheckbox',
	props: ECheckboxProps,
	setup(props, { slots, emit }) {
		const prefixCls = getPrefixCls('checkbox');

		const checkboxGroupInject = inject(CheckboxGroupKey, undefined);
		const isGroup = computed(() => !!checkboxGroupInject);
		const computedChecked = computed(() => {
			if (checkboxGroupInject) {
				return checkboxGroupInject.value.includes(props.value || '');
			}
			// 如果传入value
			if (isString(props.value)) {
				return props.modelValue === props.value;
			}
			if (isBoolean(props.modelValue)) {
				return props.modelValue;
			}
			return props.defaultChecked;
		});

		const computedDisabled = computed(() => {
			if (checkboxGroupInject) {
				return checkboxGroupInject.disabled || props.disabled;
			}

			return props.disabled;
		});

		const classNames = computed(() => {
			return {
				[prefixCls + '-disabled']: computedDisabled.value,
				[prefixCls + '-checked']: computedChecked.value,
			};
		});
		const updateValue = (e: Event) => {
			if (computedDisabled.value) {
				return;
			}
			if (isGroup.value && checkboxGroupInject) {
				const value = checkboxGroupInject.value;
				if (__DEV__) {
					watchEffect(() => {
						if (!props.value) {
							warnOnce('ECheckbox', 'checkbox-group must set value');
						}
					});
				}
				const index = value.indexOf(props.value || '');
				if (index === -1) {
					value.push(props.value || '');
				} else {
					value.splice(index, 1);
				}
				checkboxGroupInject.handleChange(value, e);
			} else {
				let val: string | boolean = '';
				if (isString(props.value)) {
					val = props.modelValue === props.value ? '' : props.value;
				} else {
					val = !computedChecked.value;
				}
				emit('change', val, e);
				emit('update:modelValue', val);
			}
		};
		const handleClick = (ev: Event) => {
			ev.stopPropagation();
		};

		return () => (
			<label class={[prefixCls, classNames.value]} aria-hidden="true">
				<input
					type="checkbox"
					checked={computedChecked.value}
					value={props.value}
					onClick={handleClick}
					onChange={updateValue}
					disabled={computedDisabled.value}
					class={[`${prefixCls}__input`]}
				/>
				<span class={[prefixCls + '-inner']}>
					<EIcon name="checkedFill" class={`${prefixCls}-icon`} size={14}></EIcon>
				</span>
				<div class={`${prefixCls}__label`}>{props.label || (slots.default && slots.default())}</div>
			</label>
		);
	},
});
