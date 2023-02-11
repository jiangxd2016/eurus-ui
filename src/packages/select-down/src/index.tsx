import type { PropType } from 'vue';
import { computed, defineComponent,ref, Transition, } from 'vue';
import './style.scss';
import type { Size } from '@/packages/_utils/size';
import { getPrefixCls } from '@/packages/_utils/global-config';
import Icon from '@/packages/icons';
import Input from '@/packages/input';
import { warn } from '@/packages/_utils/warn';
import { isArray } from '@/packages/_utils/is';
import Tag from '@/packages/tag';

const ESelectDownProps = {
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
  filterable: {
    type: Boolean,
    default: false
  },
  autocomplete: {
    type: String as PropType<'none' | 'both' | 'list' | 'inline'>,
    default: 'none',
  },
  placeholder: String,
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
  }
};

export default defineComponent({
  name: 'ESelectDown',
  props: ESelectDownProps,
  emits: ['update:modelValue', 'change', 'blur', 'focus', 'clear', 'input', 'delete'],
  setup(props, { slots, emit }) {
    const prefixCls = getPrefixCls('select-down');

    if (!props.multiple && isArray(props.modelValue)) {
      warn('ESelectDown', 'modelValue must be a string or number when multiple is false');
    }

    const paneVisible = ref(false);
    const selectDownRef = ref(null);
    const _value = ref(props.modelValue);

    const computedDisabled = computed(() => {
      return props.disabled;
    });

    const computedCls = computed(() => {
      return {
        [prefixCls]: true,
        [`${prefixCls}-${props.size}`]: props.size,
      };
    });

    const computedPlaceholder = computed(() => {
      if (props.multiple) {
        return '';
      }
      return props.placeholder;
    });

    const computedCloseVisible = computed(() => {
      if (!props.clear) {
        return false;
      }
      if (props.multiple) {
        if (isArray(props.modelValue) && props.modelValue.length === 0) {
          return false;
        }
        if (!isArray(props.modelValue) || !props.modelValue) {
          return false;
        }
      }

      if (!props.multiple && !props.modelValue) {
        return false;
      }
      return true;
    });

    const handleControlClick = () => {
      paneVisible.value = true;
    };

    const handleFocus = () => {
      paneVisible.value = true;
    };
    const handleBlur = () => {
      paneVisible.value = false;
    };
    const handleInput = (e: any) => {
      _value.value = e.target.value;
    };
    const handleKeydown = (e: KeyboardEvent): void => {
      switch (e.code) {
        case 'Enter':
          // console.log('Enter');
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

    const handleClearClick = (ev: Event) => {
      ev.stopPropagation();
      _value.value = [];
      emit('update:modelValue', _value.value);
    };
    return () => {

      return (
        <div class={computedCls.value} ref={selectDownRef}>
          <div class={`${prefixCls}-control`} role="textbox" tabindex={0} onClick={handleControlClick}>
            {
              props.multiple && isArray(_value.value) ? <div class={`${prefixCls}-control-multiple`}>

                  {_value.value.map((item: any) => {
                    return <Tag size={props.size} closable>
                      {item}
                    </Tag>;
                  })}
                </div>
                : ''}
            <Input
              class={`${prefixCls}-control-input`}
              ref="inputRef"
              placeholder={computedPlaceholder.value}
              disabled={computedDisabled.value}
              readonly={!props.filterable}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onInput={handleInput}
              onKeydown={handleKeydown}
              v-slots={{
                suffix: () => [computedCloseVisible.value && <Icon
                  name="close"
                  class="clear-icon"
                  size={20}
                  onClick={e => handleClearClick(e)}
                ></Icon>,
                  <Icon name="chevronDown" class={['down-icon', paneVisible.value && 'translate-icon']} size={20}
                  ></Icon>
                ]
              }}
            >
            </Input>
          </div>
          <Transition name="slide-toggle">
            {paneVisible.value && <div
              class={{
                [prefixCls + '-pane']: true,
              }}
              onFocus={() => {
              }}
              role="listbox"
              tabindex={0}
              onClick={(e: Event) => e.stopPropagation()}
            >
              <div class={`${prefixCls}-pane-wrapper`}>
                <div class="scroll-pane">
                  {slots.default && slots.default()}
                </div>
                <span class="down-arrow"></span>
              </div>

            </div>}
          </Transition>
        </div>

      );
    };
  },
});
