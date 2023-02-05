import type { PropType } from 'vue';
import { computed, defineComponent, ref, Transition } from 'vue';
import './style.scss';
import type { Size } from '@/packages/_utils/size';
import { getPrefixCls } from '@/packages/_utils/global-config';
// import EuTag from '@/packages/tag's

const ESelectDownProps = {
  modelValue: {
    type: Array as PropType<string[] | number[]>,
    default: () => []
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

}
  ;

export default defineComponent({
  name: 'ESelectDown',
  props: ESelectDownProps,
  emits: ['update:modelValue', 'change', 'blur', 'focus', 'clear', 'input', 'delete'],
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('select-down');
    const expanded = ref(false);

    const computedDisabled = computed(() => {
      return props.disabled;
    });

    const computedCls = computed(() => {
      return {
        [prefixCls]: true,
        [`${prefixCls}-${props.size}`]: props.size,
      };
    });

    const paneVisible = ref(false);

    const InputValue = ref('');

    const handleFocus = () => {
      paneVisible.value = true;
    };
    const handleBlur = () => {
      paneVisible.value = false;
    };
    const handleInput = (e: any) => {
      InputValue.value = e.target.value;
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
    return () => {
      const unselectable = expanded.value ? 'on' : undefined;
      return (
        <div class={computedCls.value}>
          <div class={`${prefixCls}-control`}>

            <input
              ref="inputRef"
              aria-controls="id"
              aria-autocomplete="list"
              aria-haspopup="listbox"
              aria-labelledby={props.label}
              aria-expanded={expanded.value}
              autocapitalize="off"
              autocomplete={props.autocomplete}
              class=""
              disabled={computedDisabled.value}
              name="name"
              role="combobox"
              spellcheck="false"
              type="text"
              unselectable={unselectable}
              onFocus={handleFocus.bind(this)}
              onBlur={handleBlur.bind(this)}
              onInput={handleInput.bind(this)}
              onKeydown={handleKeydown.bind(this)}
            />
          </div>
          <Transition
            name="slide-toggle"
          >
            <ul>
            {paneVisible.value && <li
              class={{
                [prefixCls + '-pane']: true,
              }}
              onFocus={() => {
              }}
              role="menuitem"
              onClick={(e: Event) => e.stopPropagation()}
            >
              <div class="scroll-pane">
                123
                {slots.default && slots.default()}
              </div>
            </li>}
            </ul>
          </Transition>
        </div>

      );
    };
  },
});
