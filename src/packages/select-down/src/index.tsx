import type { PropType } from 'vue';
import { computed, defineComponent, nextTick, ref, Transition, watch, } from 'vue';
import './style.scss';
import type { Size } from '@/packages/_utils/size';
import { getPrefixCls } from '@/packages/_utils/global-config';
import Icon from '@/packages/icons';
import { isArray } from '@/packages/_utils/is';
import Tag from '@/packages/tag';
import { stopPropagation } from '@/packages/_utils/shared';

export const ESelectDownProps = {
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
    default: undefined,
  },
  defaultValue: {
    type: [Array, String, Number, Boolean, Object],
    default: undefined,
  },
  width: String,
  size: {
    type: String as PropType<Size>,
    default: 'md'
  },
  label: String,

  autocomplete: {
    type: String as PropType<'none' | 'both' | 'list' | 'inline'>,
    default: 'none',
  },
  placeholder: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  clear: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  }
};

export default defineComponent({
  name: 'ESelectDown',
  props: ESelectDownProps,
  emits: ['update:modelValue', 'change', 'blur', 'focus', 'clear', 'input', 'delete'],
  setup(props, { slots, emit, expose }) {
    const prefixCls = getPrefixCls('select-down');

    const paneVisible = ref(false);

    const inputRef = ref<HTMLInputElement>();
    const selectDownRef = ref<HTMLDivElement>();

    const isFocus = ref(false);

    const _value = ref(props.defaultValue || props.modelValue);

    watch(() => props.modelValue, (val) => {
      _value.value = val;
    });

    const computedDisabled = computed(() => {
      return props.disabled;
    });

    const computedCls = computed(() => {
      return {
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: computedDisabled.value,
      };
    });

    const computedHasValue = computed(() => {
      if (props.multiple) {
        if (isArray(props.modelValue) && props.modelValue.length > 0) {
          return true;
        }
        return false;
      }
      if (props.modelValue) {
        return true;
      }
      return false;
    });

    const computedCloseVisible = computed(() => {
      if (!props.clear) {
        return false;
      }
      return computedHasValue.value;
    });

    const handleControlClick = () => {
      if (computedDisabled.value) {
        return;
      }
      inputRef.value?.focus();
    };

    const handleKeydown = (e: KeyboardEvent): void => {
      switch (e.code) {
        case 'Enter':
          paneVisible.value = true;
          break;
        case 'ArrowDown':
          // console.log('ArrowDown');
          break;
        case 'ArrowUp':
          // console.log('ArrowUp');
          break;
        case 'Escape':
          // console.log('Escape');
          break;
        case 'Tab':
          // console.log('Tab');
          break;
        default:
          break;
      }
    };
    const handleFocus = () => {
      isFocus.value = true;
      paneVisible.value = true;
    };
    const handleBlur = (e: FocusEvent) => {
      const target = e.relatedTarget as HTMLElement;

      if (target && selectDownRef.value?.contains(target)) {
        inputRef.value?.focus();
        return;
      }
      isFocus.value = false;
      paneVisible.value = false;

    };
    const handleClearClick = (ev: Event) => {
      ev.stopPropagation();
      _value.value = props.multiple && isArray(_value.value) ? [] : undefined;
      emit('update:modelValue', _value.value);
      emit('clear', _value.value);
    };

    const setPaneVisible = (visible: boolean) => {
      nextTick(() => {
        paneVisible.value = visible;
        if (!visible) {
          isFocus.value = false;
        }
      });
    };

    const setModelValue = (value: any) => {
      _value.value = value;
    };

    const handleTagClose = (e: Event, value: any) => {
      e.stopPropagation();
      if (!_value.value || !isArray(_value.value)) {
        return;
      }
      const index = _value.value.indexOf(value);
      if (index > -1) {
        _value.value.splice(index, 1);
      }
      emit('update:modelValue', value);
    };

    const handelChevronDownClick = (e: Event) => {
      e.stopPropagation();
      paneVisible.value = !paneVisible.value;
    };
    expose({
      setPaneVisible,
      setModelValue
    });
    return () => {
      return (
        <div class={computedCls.value} ref={selectDownRef}>
          <div
            class={[`${prefixCls}-control`, `${prefixCls}-control-${props.size}`, isFocus.value && `${prefixCls}-control-focus`]}
            role="listbox" tabindex={0}
            onClick={handleControlClick} onKeydown={handleKeydown}
          >
            {
              computedHasValue.value
                ? (props.multiple && isArray(_value.value)
                    ? <div class={`${prefixCls}-control-multiple`} role="menu" tabindex={0}
                         onClick={e => e.stopPropagation()}
                  >
                    {_value.value.map((item: any) => {
                      return <Tag size={props.size} closable onClose={(e: Event) => handleTagClose(e, item)}>
                        {item}
                      </Tag>;
                    })}
                  </div>
                    : <div class={`${prefixCls}-control-single`}>
                    {_value.value}
                  </div>)
                : <div class={`${prefixCls}-control-placeholder`}>
                  {props.placeholder}
                </div>
            }
            <input
              class={`${prefixCls}-control-input`}
              ref={inputRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
            </input>
            {
              computedCloseVisible.value && <Icon
                name="close"
                class="clear-icon"
                size={20}
                onClick={handleClearClick}
              ></Icon>}
            <Icon name="chevronDown" onClick={handelChevronDownClick}
                  class={['down-icon', paneVisible.value && 'translate-icon']} size={20}
            ></Icon>
          </div>

          <Transition name="slide-toggle">
            <div
              class={`${prefixCls}-pane`}
              style={{
                display: paneVisible.value ? 'inline-block' : 'none',
              }}
              role="listbox"
              tabindex={0}
              onClick={stopPropagation}
            >
              <div class={`${prefixCls}-pane-wrapper`}>
                <ul class="scroll-pane">
                  {slots.default && slots.default()}
                </ul>
                <span class="down-arrow"></span>
              </div>

            </div>
          </Transition>
        </div>

      );
    };
  },
});
