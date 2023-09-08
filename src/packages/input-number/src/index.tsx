import type { PropType } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import './style.scss';
import NP, { round } from 'number-precision';
import EIcon from '@/packages/icons';
import { getPrefixCls } from '@/packages/_utils/global-config';
import EInput from '@/packages/input';
import { isNumber } from '@/packages/_utils/is';
import { useFormValidate } from '@/packages/_utils/form';

type NPMethod = 'plus' | 'minus' | 'times' | 'divide' | 'round';

const EInputNumberProps = {
	placeholder: {
		type: String,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	step: {
		type: Number,
		default: 1,
	},
	max: {
		type: Number,
		default: Number.MAX_SAFE_INTEGER,
	},
	min: {
		type: Number,
		default: Number.MIN_SAFE_INTEGER,
	},
	modelValue: {
		type: Number as PropType<number | undefined>,
		default: undefined,
	},
	defaultValue: {
		type: Number as PropType<number | undefined>,
		default: undefined,
	},
	controls: {
		type: Boolean,
		default: true,
	},
	precision: Number,
};

export default defineComponent({
	name: 'EInputNumber',
	props: EInputNumberProps,
	emits: ['update:modelValue', 'change', 'focus', 'blur'],
	setup(props, { slots, emit }) {
		const prefixCls = getPrefixCls('input-number');

		const { formItemFields, validateEvent } = useFormValidate();

		const computedDisabled = computed(() => {
			return props.disabled || formItemFields?.disabled;
		});

		const computedCls = computed(() => {
			return {
				[prefixCls]: true,
				[`${prefixCls}--disabled`]: computedDisabled.value,
			};
		});

		const getStringValue = (number: number | undefined) => {
			if (!isNumber(number)) {
				return undefined;
			}

			return props.precision ? +number.toFixed(props.precision) : number;
		};

		const _value = ref(getStringValue(props.modelValue ?? props.defaultValue));

		const emitEvent = (value: number) => {
			validateEvent(value);
			emit('update:modelValue', value);
			emit('change', value);
		};

		const updateInputValue = (methods: NPMethod = 'round', value?: number) => {
			if (computedDisabled.value) {
				return;
			}
			const { step, precision, max, min } = props;
			const _step = step || 1;
			const _precision = precision || 0;
			let val = 0;

			if (value) {
				val = value;
			} else {
				val = NP[methods](value || _value.value || 0, _step);
			}
			if (val > max) {
				val = max;
			}
			if (val < min) {
				val = min;
			}
			_value.value = +round(val, _precision).toFixed(_precision);
			emitEvent(_value.value);
		};

		const handleInput = (value: number) => {
			if (computedDisabled.value) {
				return;
			}
			_value.value = value;
			emitEvent(value);
		};
		const handleChange = (value: number) => {
			if (computedDisabled.value) {
				return;
			}
			_value.value = value;
			emitEvent(value);
		};

		const handleFocus = (event: MouseEvent | FocusEvent) => {
			if (computedDisabled.value) {
				return;
			}
			validateEvent(_value.value);
			emit('focus', event);
		};

		const handleBlur = (event: MouseEvent | FocusEvent) => {
			if (computedDisabled.value) {
				return;
			}
			if (props.precision) {
				updateInputValue('round', _value.value);
			}
			validateEvent(_value.value);
			emit('blur', event);
		};

		watch(
			() => props.modelValue,
			(n, o) => {
				if (n && n !== o && n !== +(_value.value || 0)) {
					updateInputValue('round', n);
				}
			},
		);
		const slot = props.controls
			? {
					prefix: () => (
						<span
							class={`${prefixCls}-minus`}
							aria-hidden="true"
							onClick={() => updateInputValue('minus')}
						>
							{slots['minus-icon'] ? slots['minus-icon']() : <EIcon name="minus" size="22" />}
						</span>
					),
					suffix: () => (
						<span
							class={`${prefixCls}-plus`}
							aria-hidden="true"
							onClick={() => updateInputValue('plus')}
						>
							{slots['plus-icon'] ? slots['plus-icon']() : <EIcon name="plus" size="22" />}
						</span>
					),
			  }
			: {};
		return () => (
			<div class={computedCls.value}>
				<EInput
					ref="inputNumberRef"
					type="number"
					modelValue={_value.value}
					placeholder={props.placeholder}
					disabled={props.disabled}
					onInput={handleInput}
					onChange={handleChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					aria-valuemax={props.max}
					aria-valuemin={props.min}
					aria-valuenow={_value.value}
					v-slots={slot}
				></EInput>
			</div>
		);
	},
});
