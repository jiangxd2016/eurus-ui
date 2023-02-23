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
  placeholder: {
    type: String,
    default: '',
  },
  startPlaceholder: {
    type: String,
    default: '',
  },
  endPlaceholder: {
    type: String,
    default: '',
  },
  disabled: {
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
  },
  scrollPanel: {
    type: Boolean,
    default: true
  },
  range: {
    type: Boolean,
    default: false
  },
  rangeSeparator: {
    type: String,
    default: '-'
  }
};

export default defineComponent({
  name: 'ESelectDown',
  props: ESelectDownProps,
  emits: ['update:modelValue', 'change', 'blur', 'focus', 'clear', 'input', 'delete'],
  setup(props, { slots, emit, expose }) {
    const prefixCls = getPrefixCls('select-down');

    const panelVisible = ref(true);

    const inputRef = ref<HTMLInputElement>();
    const selectDownRef = ref<HTMLDivElement>();

    const isFocus = ref(false);
    const _value = ref(props.modelValue);

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

    // range value
    const computedRangeValue = computed(() => {
      if (isArray(_value.value) && _value.value.length > 0) {
        return _value.value;
      }
      return [];

    });

    const handleControlClick = async () => {
      await nextTick();

      if (computedDisabled.value) {
        return;
      }
      if (panelVisible.value) {
        inputRef.value?.blur();
      } else {
        inputRef.value?.focus();
      }
    };

    const handleKeydown = (e: KeyboardEvent): void => {
      if (computedDisabled.value) {
        return;
      }
      switch (e.code) {
        case 'Enter':
          panelVisible.value = !panelVisible.value;
          break;
        case 'ArrowDown':
          // console.log('ArrowDown');
          break;
        case 'ArrowUp':
          // console.log('ArrowUp');
          break;
        case 'Escape':
          // console.log('Escape');
          panelVisible.value = false;
          inputRef.value?.blur();
          break;
        case 'Tab':
          // console.log('Tab');
          panelVisible.value = false;
          inputRef.value?.blur();
          break;
        default:
          break;
      }
    };
    const handleFocus = () => {
      if (computedDisabled.value) {
        return;
      }
      isFocus.value = true;
      panelVisible.value = true;
    };
    const handleBlur = (e: FocusEvent) => {
      if (computedDisabled.value) {
        return;
      }
      const target = e.relatedTarget as HTMLElement;

      if (target && selectDownRef.value?.contains(target)) {
        inputRef.value?.focus();
        return;
      }
      isFocus.value = false;
      panelVisible.value = false;

    };
    const handleClearClick = (ev: Event) => {
      if (computedDisabled.value) {
        return;
      }
      ev.stopPropagation();
      _value.value = props.multiple && isArray(_value.value) ? [] : undefined;
      emit('update:modelValue', _value.value);
      emit('clear', _value.value);
    };

    const setPanelVisible = (visible: boolean) => {
      panelVisible.value = visible;
      if (!visible) {
        isFocus.value = false;
      }
    };

    const setModelValue = (value: any) => {
      _value.value = value;
    };

    const handleTagClose = (e: Event, value: any) => {
      e.stopPropagation();

      if (computedDisabled.value) {
        return;
      }
      if (!_value.value || !isArray(_value.value)) {
        return;
      }
      const index = _value.value.indexOf(value);
      if (index > -1) {
        _value.value.splice(index, 1);
      }
      emit('update:modelValue', value);
    };

    const handlePanelClick = (e: Event) => {
      stopPropagation(e);
      if (computedDisabled.value) {
        return;
      }
      if (props.multiple) {
        return;
      }
      panelVisible.value = false;
      inputRef.value?.blur();
    };

    expose({
      setPanelVisible,
      setModelValue
    });
    return () => {
      const Control = () => {
        if (props.range) {
          return <div class={`${prefixCls}-control-range`}>
            <div class={`${prefixCls}-single`}>
              {computedRangeValue.value[0] ? computedRangeValue.value[0] : <span class="placeholder">{props.startPlaceholder}</span>}
            </div>
            <span>{props.rangeSeparator}</span>
            <div class={`${prefixCls}-single`}>
              { computedRangeValue.value[1] ? computedRangeValue.value[1] : <span class="placeholder">{props.endPlaceholder}</span>}
            </div>
          </div>;
        }

        if (!computedHasValue.value) {
          return <div class={`${prefixCls}-control-placeholder`}>
            {props.placeholder}
          </div>;
        }
        if (props.multiple && isArray(_value.value)) {
          return <div class={`${prefixCls}-control-multiple`} role="menu" tabindex={0}
                      onClick={e => e.stopPropagation()}
          >
            {_value.value.map((item) => {
              return <Tag size={props.size} closable disabled={computedDisabled.value}
                          onClose={(e: Event) => handleTagClose(e, item)}
              >
                {item}
              </Tag>;
            })}
          </div>;
        } else {
          return <div class={`${prefixCls}-single`}>
            {_value.value}
          </div>;
        }
      };
      return (
        <div class={computedCls.value} ref={selectDownRef}>
          <div
            class={[`${prefixCls}-control`, `${prefixCls}-control-${props.size}`, isFocus.value && `${prefixCls}-control-focus`]}
            role="listbox" tabindex={0}
            onClick={handleControlClick} onKeydown={handleKeydown}
          >
            {Control()}
            <input
              class={`${prefixCls}-control-input`}
              ref={inputRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
            </input>
            {
              computedCloseVisible.value && !computedDisabled.value && <Icon
                name="close"
                class="clear-icon"
                size={20}
                onClick={handleClearClick}
              ></Icon>}
            <Icon name="chevronDown"
                  class={['down-icon', panelVisible.value && 'translate-icon']} size={20}
            ></Icon>
          </div>

          <Transition name="slide-toggle">
            <div
              class={`${prefixCls}-panel`}
              style={{
                display: panelVisible.value ? 'inline-block' : 'none',
              }}
              role="listbox"
              tabindex={0}
              onClick={handlePanelClick}
            >
              <div class={`${prefixCls}-panel-wrapper`}>
                <ul class={['panel', props.scrollPanel && 'scroll']}>
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
