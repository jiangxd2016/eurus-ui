import type { PropType } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import './style.scss';
import { getPrefixCls } from '@/packages/_utils/global-config';

const ETextareaProps = {
  modelValue: {
    type: String,
    default: '',
  },
  autoHeight: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '50px',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  maxlength: {
    type: Number,
  },
  minLength: {
    type: Number,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
  },
  spellcheck: {
    type: Boolean,
  },
  wrap: {
    type: String as PropType<'soft' | 'hard'>,
    default: 'soft',
  },
  showWordLimit: {
    type: Boolean,
    default: false,
  }
};

export default defineComponent({
  name: 'ETextarea',
  props: ETextareaProps,
  emits: ['update:modelValue'],
  setup(props, { emit }) {

    const prefixCls = getPrefixCls('textarea');

    const _value = ref(props.modelValue);
    const textareaEl = ref(null);

    watch(() => props.modelValue, (val) => {
      _value.value = val;
    });

    const computedDisabled = computed(() => {
      return props.disabled;
    });

    const computedStyle = computed(() => {
      return {
        width: props.width,
        height: props.height,
        minHeight: props.height,
        overflow: props.autoHeight ? 'hidden' : ''
      };
    });

    const handleChange = (e: Event) => {
      const target = e.target as HTMLTextAreaElement;
      _value.value = target.value;
      emit('update:modelValue', target.value);
    };
    return () => (
      <div class={prefixCls}>
        <textarea
          ref={textareaEl}
          {...props}
          v-model={_value.value}
          class={{ [`${prefixCls}-input-control`]: true, disabled: computedDisabled.value }}
          style={computedStyle.value}
          disabled={computedDisabled.value}
          maxlength={props.maxlength}
          minlength={props.minLength}
          placeholder={props.placeholder}
          readonly={props.readonly}
          rows={props.rows}
          spellcheck={props.spellcheck}
          wrap={props.wrap}
          onInput={handleChange}
        ></textarea>
        {props.showWordLimit && props.maxlength && <span class="input-count" >{_value.value.length}/{props.maxlength}</span>}
      </div>

    );
  },
});
