import { debounce } from '@estjs/tools';
import type { PropType } from 'vue';
import { computed, inject, onMounted, ref, watch, defineComponent } from 'vue';
import { getPrefixCls } from '@/packages/_utils/global-config';
import './style.scss';
const prefixCls = getPrefixCls('textarea');

export default defineComponent({
  name: 'ETextarea',
  props: {
    modelValue: { type: String as PropType<string>, default: '' },
    autoHeight: { type: Boolean, default: true },
    width: { default: '100%' },
    height: { default: '80px' },
    disabled: { type: Boolean, default: false },
    maxlength: Number,
    showWordLimit: { type: Boolean },
    maxHeight: String
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit: emits }) {
    const textValue = ref(props.modelValue);
    const border = ref(2);
    const textareaEl = ref();
    const height = ref(props.height);
    const overflow = ref(props.autoHeight ? 'hidden' : '');
    const controlChange: any = inject(`${prefixCls}ControlChange`, '');

    const disabledOk = computed(() => {
      // return getFormDisabled(props.disabled);
      return false;
    });
    const style = computed<any>(() => {
      return {
        width: props.width,
        height: height.value,
        minHeight: props.height,
        maxHeight: props.maxHeight,
        overflow: overflow.value
      };
    });
    const setAutoHeight = debounce(() => {
      if (props.autoHeight) {
        const sHeight = textareaEl.value.scrollHeight + border.value;
        height.value = sHeight + 'px';
        if (sHeight > Number.parseInt(props.maxHeight || '')) {
          overflow.value = 'auto';
        }
      }
    }, 200);
    const getBorder = () => {
      // 取下边框的高，计算会准确点
      border.value = textareaEl.value.offsetHeight - textareaEl.value.clientHeight;
    };
    const controlChangeEvent = (val: any, type?: string) => {
      controlChange && controlChange(val, type);
    };
    const emitChange = (value: string) => {
      emits('update:modelValue', value);
      controlChangeEvent(value);
    };
    const change = (evt: Event) => {
      const { value } = evt.target as HTMLInputElement;
      emitChange(value);
      setAutoHeight();
    };

    onMounted(() => {
      getBorder();
      controlChangeEvent(props.modelValue, 'mounted');
    });
    /*  watch(textValue, (value: any) => {
      emitChange(value)
      if (props.autoHeight) {
        textareaEl.value.style.height = 'auto'
        textareaEl.value.style.height =
          textareaEl.value.scrollHeight + border.value + 'px'
      }
    }) */

    watch(
      () => props.modelValue,
      (v: any) => {
        controlChangeEvent(v, 'mounted');
      }
    );
    return () => (
      <div class={[prefixCls]}>
        <textarea
          ref={textareaEl}
          {...props}
          v-model={textValue.value}
          class={{ [`${prefixCls}-input-control`]: true, disabled: disabledOk.value }}
          style={style.value}
          disabled={disabledOk.value}
          maxlength={props.maxlength}

          onInput={change}
        ></textarea>
        {props.showWordLimit && props.maxlength && <span class="input-count" >{textValue.value.length}/{props.maxlength}</span>}
      </div>

    );
  },
});
