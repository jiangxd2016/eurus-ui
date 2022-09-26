import type { PropType, StyleValue } from 'vue';
import { Transition, isRef, defineComponent, ref, reactive, watch, computed, onMounted, nextTick, onBeforeUnmount, normalizeClass, unref } from 'vue';
import Tag from '@/packages/tag';
import { getOffset, getWindow } from '@/packages/_utils/dom';
import { getPrefixCls } from '@/packages/_hooks/use-global-config';

import './style.scss';
import type { MaybeRef } from '@/packages/_utils';

export default defineComponent({
  name: 'ESelectDown',
  props: {
    modelValue: {
      type: Array as PropType<MaybeRef<string[] | number[]>>,
      default: () => []
    },
    width: String,
    multiple: { type: Boolean, default: false },
    collapseTags: { type: Boolean, default: false },
    clear: { type: Boolean, default: false },
    filterable: { type: Boolean, default: false },
    size: {
      type: String as PropType<string>,
      default: ''
    },
    placeholder: String,
    disabled: { type: Boolean, default: false },
    direction: { default: 0 },
    downClass: { default: '' },
    downStyle: Object,
    appendToBody: { type: Boolean, default: false },
    downHeight: { default: 0 },
    icon: { default: 'arrow' },
    fixedIcon: { type: Boolean },
    isRange: { type: Boolean, default: false },
    rangeSeparator: { default: 'To' },
    endPlaceholder: String
  },
  emits: ['update:modelValue', 'blur', 'toggleClick', 'clear', 'delete', 'input', 'focus'],
  setup(props, { slots, expose, emit: emits }) {

    const prefixCls = getPrefixCls('select-down');

    const el = ref();
    const selectDown = ref();
    const modelValue = ref(isRef(props.modelValue) ? props.modelValue.value : props.modelValue);
    const state = reactive({
      valueLabel: ref(modelValue),
      visible: false,
      appendStyle: {
        top: '',
        minWidth: '',
        bottom: '',
        left: ''
      },
      direction2: props.direction,
      stopPropagation: false,
      searchValueM: ''
    });
    watch(() => props.modelValue, (val) => {
      state.valueLabel = JSON.parse(JSON.stringify(val));
    });
    const disabledOk = computed(() => {
      // return getFormDisabled(props.disabled);
      return false;
    });
    const inputCls = computed(() => {
      const cls = [`${prefixCls}-input-control`];
      if (+props.size > 0) {
        cls.push(props.size);
      }
      if (disabledOk.value) {
        cls.push('disabled');
      }
      return cls.join(' ');
    });

    const slideUp = (evt: any) => {
      if (state.visible && !state.stopPropagation) {
        evt && emits('toggleClick', false, evt);
        state.visible = false;
        state.searchValueM = '';
      }
    };
    const updateModel = () => {
      emits('update:modelValue', state.valueLabel);
    };
    const mouseEvent = (evt: Event, type: any, index: any) => {
      if (props.filterable) {
        if (props.isRange) {
          emits(type, state.valueLabel, index);
          updateModel();
          return;
        }
        const { value } = evt.target as any;
        emits(type, value);
        updateModel();
      }
    };
    const inputInput = (e: Event, index?: number) => {
      mouseEvent(e, 'input', index);
    };
    const inputBlur = (e: Event, index?: number) => {
      mouseEvent(e, 'blur', index);
    };
    const inputFocus = (e: Event, index?: number) => {
      mouseEvent(e, 'focus', index);
    };
    const setAppendToBodyStyle = () => {
      const offset = getOffset(el.value);
      if (props.appendToBody) {
        const ww = getWindow();
        state.appendStyle = {
          bottom: 'auto',
          minWidth: offset.width + 'px',
          left: offset.left + 'px',
          top: offset.top + offset.height + 8 + 'px'
        };
        if (state.direction2 === 2) {
          state.appendStyle.top = 'auto';
          state.appendStyle.bottom = ww.height - offset.top + 'px';
        }
      } else {
        state.appendStyle.top = offset.height + 8 + 'px';
        state.appendStyle.bottom = 'auto';
        if (state.direction2 === 2) {
          state.appendStyle.top = 'auto';
          state.appendStyle.bottom = offset.height + 8 + 'px';
        }
      }
    };
    const setPosition = (evt: { clientY: any }) => {
      if (props.direction === 0) {
        state.direction2 = props.direction;
        const wh = document.documentElement.clientHeight || document.body.clientHeight;
        const clientY = evt.clientY;
        const downMaxHeight = props.downHeight || selectDown.value.offsetHeight || 0;
        if (downMaxHeight > wh - clientY && clientY > downMaxHeight) {
          state.direction2 = 2;
        }
      }
    };
    const downHeightStyle = computed(() => {
      if (props.downHeight) {
        return {
          'max-height': props.downHeight + 'px',
          'overflow-y': 'auto'
        };
      }
      return {};
    });
    const downPanelStyle = computed(() => {
      return Object.assign({}, state.appendStyle, props.downStyle || {});
    });
    onMounted(() => {
      nextTick(() => {
        document.addEventListener('click', slideUp);
        if (props.appendToBody) {
          document.body.append(selectDown.value);
        }
      });
    });
    onBeforeUnmount(() => {
      document.removeEventListener('click', slideUp);
      if (props.appendToBody && selectDown.value) {
        selectDown.value.remove();
      }
    });

    const downToggle = (evt: any) => {
      if (disabledOk.value) {
        return;
      }
      state.visible = true;
      nextTick(() => {
        setPosition(evt);
        setAppendToBodyStyle();
      });
      emits('toggleClick', state.visible, evt);
      state.stopPropagation = true;
      setTimeout(() => {
        state.stopPropagation = false;
      }, 50);
    };
    const selectControlClick = (evt: { stopPropagation: () => void }) => {
      if (state.visible && !props.filterable) {
        slideUp(evt);
        evt.stopPropagation();
      }
    };
    const deleteText = (index: number) => {
      state.valueLabel.splice(index, 1);
      updateModel();
      emits('delete', index);
    };
    const clearClick = (evt: { stopPropagation: () => void }) => {
      state.valueLabel = [];
      updateModel();
      emits('clear');
      evt.stopPropagation();
    };
    const setValue = (val: any) => {
      state.valueLabel = JSON.parse(JSON.stringify(val));
    };
    expose({ slideUp, setValue });
    return () => {
      return <div
        ref={el}
        class={{
          'is-down': state.visible,
          [prefixCls]: true,
          'disabled': disabledOk
        }}
        style={{ width: props.width }}
        onClick={downToggle}
      >
        <div class="select-control" onClick={selectControlClick}>
          {props.isRange && <div class={normalizeClass(['select-range', unref(inputCls)])}>
            <input
              v-model={state.valueLabel[0]}
              readonly={!props.filterable}
              placeholder={props.placeholder}
              disabled={disabledOk.value}
              onInput={($event: Event) => inputInput($event, 0)}
              onFocus={($event: Event) => inputFocus($event, 0)}
              onBlur={($event: Event) => inputBlur($event, 0)}
            />
            <span>{props.rangeSeparator}</span>
            <input
              v-model={state.valueLabel[1]}
              readonly={!props.filterable}
              placeholder={props.placeholder}
              disabled={disabledOk.value}
              onInput={($event: Event) => inputInput($event, 1)}
              onFocus={($event: Event) => inputFocus($event, 1)}
              onBlur={($event: Event) => inputBlur($event, 1)}
            />
          </div>}
          {
            props.multiple ? <div class={normalizeClass([unref(inputCls), 'multiple-text'])}>
              <ul placeholder={props.placeholder}>
                {props.collapseTags ? [
                  state.valueLabel.length > 0 && <li >
                    <span v-text={state.valueLabel[0]}></span>
                    <i class="icon-error"onClick={() => deleteText(0)}></i>
                  </li>,
                  state.valueLabel.length > 1 && <li >
                    <Tag size="mini" type="info"> +{state.valueLabel.length}</Tag>
                  </li>
                ] : state.valueLabel.map((item: any, index: number) => {
                  return <li key={index}>
                    <span v-text={item}></span>
                    <i class="icon-error"onClick={() => deleteText(index)}></i>
                  </li>;
                })}

                {props.filterable && <li class="input">
                  <input
                    v-model={state.searchValueM}
                    type="text"
                    placeholder={state.valueLabel.length === 0 ? props.placeholder : ''}
                    disabled={disabledOk.value}
                    onInput={inputInput}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </li>}

              </ul>
            </div>
              : <input
                v-model={state.valueLabel[0]}
                readonly={!props.filterable}
                placeholder="placeholder"
                class={inputCls.value}
                disabled={disabledOk.value}
                onInput={inputInput}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
          }
          <span class="group-icon">
            {props.clear && modelValue.value.length > 0 && <i
              class="icon-close"
              title="清空"
              onClick={clearClick}
            ></i>}

            <i
              class={{ down: state.visible && !props.fixedIcon, [`icon-${props.icon}`]: true }}></i >
          </span >
        </div >
        <Transition
          name={state.direction2 === 2 ? 'slide-toggle-top' : 'slide-toggle'}
        >
          {state.visible && <div
            ref={selectDown}
            class={{
              [prefixCls + '-pane']: true,
              downClass: props.downClass,
              top: state.direction2 === 2
            }}
            style={downPanelStyle.value}
            onClick={($event: Event) => $event.stopPropagation()}
          >
            <div style={downHeightStyle.value as StyleValue} class="scroll-pane">
              {slots.default && slots.default()}
            </div>
            <span class={{ 'is-range': props.isRange, 'down-arrow': true }}></span>
          </div >}

        </Transition >
      </div >;
    };
  }
});
