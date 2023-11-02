import type { PropType } from 'vue';
import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import { getPrefixCls } from '@/packages/_utils/global-config';
import './style.scss';
import { isKorean, isNull, isUndefined } from '@/packages/_utils/is';
import EIcon from '@/packages/icons';
import type { Size } from '@/packages/_utils/size';
import { useFormValidate } from '@/packages/_utils/form';

const EInputProps = {
	type: {
		type: String as PropType<'text' | 'password' | 'number'>,
		default: 'text',
	},
	modelValue: {
		type: [String, Number] as PropType<string | number | null | undefined>,
		default: '',
	},
	defaultValue: {
		type: String,
		default: '',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String as PropType<Size>,
		default: 'md',
	},
	placeholder: {
		type: String,
		default: '',
	},
	maxLength: {
		type: Number,
		default: 0,
	},
	showWordLimit: {
		type: Boolean,
		default: false,
	},
	clearable: {
		type: Boolean,
		default: false,
	},

	autocomplete: {
		type: String as PropType<'none' | 'both' | 'list' | 'inline'>,
		default: 'none',
	},
	readonly: {
		type: Boolean,
		default: false,
	},
	label: {
		type: String,
		default: undefined,
	},

	tabindex: {
		type: [String, Number],
		default: 0,
	},
	form: {
		type: String,
	},
	id: {
		type: String,
		default: undefined,
	},
};
export default defineComponent({
	name: 'EInput',
	props: EInputProps,
	emits: [
		'update:modelValue',
		'change',
		'focus',
		'blur',
		'clear',
		'input',
		'keydown',
		'compositionstart',
		'compositionupdate',
		'compositionend',
	],
	setup(props, { slots, emit, expose }) {
		const prefixCls = getPrefixCls('input');
		const wrapperCls = getPrefixCls('input-wrapper');

		const { formItemFields, validateEvent } = useFormValidate(props.type !== 'number');

		const { size, type, placeholder, modelValue } = toRefs(props);

		const _value = ref(props.defaultValue);
		const inputRef = ref<HTMLInputElement | null>(null);
		const isComposing = ref(false);
		const isFocus = ref(false);

		const maxLength = computed(() => {
			return props.maxLength > 0 ? props.maxLength : undefined;
		});
		const computedValue = computed(() => {
			return props.modelValue ?? _value.value;
		});

		const computedDisabled = computed(() => {
			return props.disabled || formItemFields?.disabled;
		});
		const computedCls = computed(() => {
			return [
				wrapperCls,
				`${wrapperCls}--${size.value}`,
				computedDisabled.value && `${wrapperCls}--disabled`,
			];
		});
		const showClearBtn = computed(() => props.clearable && Boolean(computedValue.value));

		let preValue = computedValue.value;
		watch(modelValue, value => {
			if ((isUndefined(value) || isNull(value)) && props.type !== 'number') {
				_value.value = '';
				validateEvent(value);
			}
		});
		// update value
		const updateValue = (value: string | number | null) => {
			let valueStr = '';
			if (value) {
				valueStr = String(value);
				if (maxLength.value && valueStr.length > maxLength.value) {
					valueStr = valueStr.slice(0, maxLength.value);
				}
			}

			_value.value = valueStr;
			emit('update:modelValue', value);

			validateEvent(value);
		};
		const emitChange = (value: string | number, ev: Event) => {
			if (value !== preValue) {
				preValue = value;
				emit('change', value, ev);

				validateEvent(value);
			}
		};

		const handleInput = (ev: Event) => {
			if (computedDisabled.value) {
				return;
			}
			if (isComposing.value) {
				return;
			}
			let value: string | number | null = (ev.target as HTMLInputElement).value;
			if (props.type === 'number') {
				value = value ? Number(value) : null;
			}

			updateValue(value);
			emit('input', value, ev);

			validateEvent(value);
		};
		const handleBlur = (ev: Event) => {
			isFocus.value = false;
			emit('blur', ev);

			validateEvent(computedValue.value, 'blur');
		};
		const handleFocus = (ev: Event) => {
			isFocus.value = true;
			emit('focus', ev);

			validateEvent(computedValue.value, 'blur');
		};
		const handleClear = (ev: MouseEvent) => {
			if (computedDisabled.value) {
				return;
			}
			updateValue('');
			emitChange('', ev);
			emit('clear', ev);

			validateEvent(computedValue.value, 'blur');
		};
		const handleKeydown = (ev: KeyboardEvent) => {
			if (computedDisabled.value) {
				return;
			}
			emit('keydown', ev);
		};

		// composition
		const compositionStart = (ev: Event) => {
			emit('compositionstart', ev);
			isComposing.value = true;
		};
		const compositionUpdate = (ev: Event) => {
			emit('compositionupdate', ev);
			const text = (ev.target as HTMLInputElement)?.value;
			const lastCharacter = text[text.length - 1] || '';
			isComposing.value = !isKorean(lastCharacter);
		};
		const compositionEnd = (ev: Event) => {
			emit('compositionend', ev);
			if (isComposing.value) {
				isComposing.value = false;
				handleInput(ev);
			}
		};
		// expose methods
		const triggerFocus = () => {
			isFocus.value = true;
			inputRef.value?.focus();
		};
		const triggerBlur = () => {
			inputRef.value?.blur();
		};
		expose({ focus: triggerFocus, blur: triggerBlur });
		return () => (
			<span class={computedCls.value}>
				{slots.prefix && <span class={`${prefixCls}-prefix`}>{slots.prefix()}</span>}
				<input
					id={props.id}
					ref={inputRef}
					value={computedValue.value}
					type={type.value}
					readonly={props.readonly}
					aria-label={props.label}
					tabindex={props.tabindex}
					placeholder={placeholder.value}
					form={props.form}
					disabled={computedDisabled.value}
					maxlength={maxLength.value}
					class={[prefixCls]}
					onCompositionstart={compositionStart}
					onCompositionupdate={compositionUpdate}
					onCompositionend={compositionEnd}
					onInput={handleInput}
					onBlur={handleBlur}
					onFocus={handleFocus}
					onKeydown={handleKeydown.bind(this)}
				/>
				{showClearBtn.value && (
					<span onClick={handleClear} aria-hidden="true" class={`${prefixCls}-clearable`}>
						<EIcon name="close" size={size.value}></EIcon>
					</span>
				)}
				{(slots.suffix || (Boolean(props.maxLength) && props.showWordLimit)) && (
					<span class={`${prefixCls}-suffix`}>
						{Boolean(props.maxLength) && props.showWordLimit && (
							<span class={`${prefixCls}-word-limit`}>
								{(computedValue.value + '').length} / {maxLength.value}
							</span>
						)}
						{slots.suffix?.()}
					</span>
				)}
			</span>
		);
	},
});
