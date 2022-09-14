import { computed, defineComponent, inject, onMounted, provide, reactive, ref, toRefs, watch } from 'vue';
import './style.scss';
import SelectDown from '@/packages/select-down';
import { getPrefixCls } from '@/packages/_utils/global-config';

interface StateType {
  checked: any;
  keywords: string;
  setFirst: boolean;
  tempChecked: string;
}

interface FormControlOption {
  [key: string]: any; // 使用动态变量时不会报错
  label: string;
  value: [string | number];
  disabled?: boolean;
  _disabled?: boolean;
}

const ESelectProps = {
  modelValue: null,
  multiple: { type: Boolean },
  filterable: { type: Boolean },
  downHeight: { default: 200 },
  multipleLimit: null,
  options: { default: () => [] },
  optionsKey: {
    default: () => {
      return { label: 'label', value: 'value' };
    }
  },
  beforeChange: null,
  async: { type: Boolean },
  emptyText: { default: '\u65E0\u6570\u636E' }
};
// const emits = defineEmits<{
//   (e: 'update:modelValue', modelValue: string[] | string | number): void
//   (e: 'change', value: string[] | string | number, obj: any): void
//   (e: 'limitChange', value: string[] | string | number): void
//   //(e: 'toggleClick', value: boolean, evt: MouseEvent): void
//   (e: 'clear'): void
//   (e: 'delete', value?: number): void
//   (e: 'input', value: string): void
//   (e: 'focus', value: string): void
//   (e: 'blur', value: string): void
//   (e: 'toggleClick', value: boolean): void
// }>()
export default defineComponent({
  name: 'ESelect',
  props: ESelectProps,
  emits: ['update:modelValue', 'change', 'limitChange', 'clear', 'delete', 'input', 'focus', 'blur', 'toggleClick'],
  setup(props, { slots, expose, emit: emits }) {

    const prefixCls = getPrefixCls('select');

    const selectDownEl = ref();
    const state = reactive<StateType>({
      checked: [], // 所有已选择的集合
      keywords: '',
      setFirst: false, // 手动选择改变选项时，在watch时不触发setFirstText事件
      tempChecked: ''
    });
    // 下拉的数据，存在options插槽里面插入的数据
    const optionsList = ref<FormControlOption[]>(
      JSON.parse(JSON.stringify(props.options))
    );

    const { optionsKey } = toRefs(props);
    const optLabel = optionsKey.value.label;
    const optValue = optionsKey.value.value;
    const controlChange: any = inject(`${prefixCls}ControlChange`, '');

    const slideUp = () => {
      selectDownEl.value.slideUp();
    };
    const getValueLabel = (obj: any) => {
      return obj[optValue] === undefined ? obj[optLabel] : obj[optValue];
    };
    const emitCom = (item?: any, update = true) => {
      state.setFirst = update;
      let val: any = [];
      state.checked.forEach((obj: FormControlOption) => {
        val.push(getValueLabel(obj));
      });
      if (!props.multiple) {
        val = val[0] || '';
      }
      emits('update:modelValue', val);
      controlChange && controlChange(val);
      emits('change', val, item); // 改变事件
    };
    // 选中的文本值
    const showLabel = computed(() => {
      return state.checked.map((item: any) => item[optLabel]);
    });
    const inputBlur = (value: any) => {
      // 搜索输入框失焦时，判断输入的值是否符合
      if (!props.filterable) {
        return;
      }
      const filter: any = optionsList.value.filter((item: any) => {
        return item[optLabel] === value && !item.disabled;
      });
      if (filter.length > 0) {
        // 输入框符合要求，检查下当前项是不是已选择
        let hasItem = false;
        state.checked.forEach((item: any) => {
          if (item[optLabel] === filter[0][optLabel]) {
            hasItem = true;
          }
        });
        if (!hasItem) {
          // 没有时添加
          state.checked.push(filter[0]);
          emitCom(filter[0]);
        }
      }
      // 恢复输入框的值，存在输入后不点击下拉的情况
      selectDownEl.value.setValue(showLabel.value);
      // 还原下拉数据
      state.keywords = '';
      setTimeout(() => {
        optionsList.value.forEach((item: any) => {
          delete item._disabled;
        });
      }, 500);
      emits('blur', value);
    };
    const inputChange = (value: any) => {
      // 默认情况下仅对当前下拉数据进行筛选
      if (!props.filterable) {
        return;
      }
      state.keywords = value;
      if (!props.async) {
        // 从当前下拉列表筛选
        optionsList.value.forEach((item: any) => {
          item._disabled = !item[optLabel].includes(value);
        });
      }
      state.setFirst = true;
      emits('input', value);
    };
    // 设置初始值
    const setFirstText = () => {
      // console.log('setFirstText')
      if (state.setFirst) {
        return;
      }
      state.setFirst = false;
      if (props.modelValue && optionsList.value && optionsList.value.length > 0) {
        state.checked = [];
        if (typeof props.modelValue === 'object') {
          props.modelValue.forEach((val: string) => {
            state.checked.push({
              [optLabel]: val,
              [optValue]: val
            });
          });
        } else {
          state.checked.push({
            [optLabel]: props.modelValue,
            [optValue]: props.modelValue
          });
        }
        for (let i = 0; i < optionsList.value.length; i++) {
          const item = optionsList.value[i];
          const value = getValueLabel(item);
          if (props.multiple) {
            // 多选
            if (typeof props.modelValue === 'object') {
              const index = props.modelValue.indexOf(value);
              if (index !== -1) {
                state.checked.splice(index, 1, item);
              }
            }
          } else if (value === props.modelValue) {
            state.checked.splice(0, 1, item); // 没有label时直接取value
            break;
          }

        }
      }
    };
    const getActive = (item: FormControlOption) => {
      const val = getValueLabel(item);
      if (props.multiple) {
        if (typeof props.modelValue === 'object') {
          return props.modelValue.includes(val);
        }
      } else {
        return val === props.modelValue;
      }
    };

    const itemClick = (item: FormControlOption, evt: MouseEvent) => {
      if (!item.disabled) {
        if (props.beforeChange && !props.beforeChange(item)) {
          slideUp();
          evt.stopPropagation();
          return;
        }
        const activeValue = getValueLabel(item) as string;
        if (props.multiple) {
          // 多选
          if (
            props.multipleLimit
            && props.multipleLimit > 0
            && props.multipleLimit <= state.checked.length
          ) {
            emits('limitChange', props.modelValue);
            return false;
          }
          let hasItem = -1;
          state.checked.forEach((ch: any, index: number) => {
            const val = getValueLabel(ch) as string;
            if (val === activeValue) {
              // 当前选项已选上，则取消选择
              hasItem = index;
            }
          });
          if (hasItem !== -1) {
            state.checked.splice(hasItem, 1);
          } else {
            state.checked.push(item);
          }
          emitCom(item);
        } else {
          // 单选
          state.checked = [item];
          slideUp(); // 收起下拉
          emitCom(item);
        }
        // 判断有没通过点击删除
      }
      evt.stopPropagation();
    };
    const toggleClick = (val: boolean) => {
      if (props.multiple && typeof props.modelValue === 'object') {
        if (val) {
          state.tempChecked = JSON.stringify(props.modelValue);
        } else {
          // 收起时判断当前所选值是否都包含了展开时的值
          const tempChecked = JSON.parse(state.tempChecked);
          let isDel = true;
          tempChecked.forEach((item: string) => {
            if (!(props.modelValue as any).includes(item)) {
              isDel = false; // 有删除
            }
          });
          if (!isDel) {
            emits('delete', -1);
          }
        }
      }
      emits('toggleClick', val);
    };

    const getItemText = (label: string): string => {
      if (state.keywords && props.filterable) {
        const reg = new RegExp(`${state.keywords}`, 'gi');
        // return label.replace(//gi,)
        return label.replace(reg, '<b>' + '$&' + '</b>');
      } else {
        return label;
      }
    };

    // 清空事件
    const clearClick = () => {
      state.checked = [];
      emitCom();
      emits('clear');
    };
    // 删除选项事件
    const deleteClick = (index: number) => {
      state.checked.splice(index, 1);
      emitCom();
      emits('delete', index);
    };
    provide(`${prefixCls}GetChildOption`, (item: any) => {
      optionsList.value.push(item);
    });
    onMounted(() => {
      setFirstText();
    });
    watch(
      () => props.modelValue,
      () => {
        setFirstText();
      }
    );
    watch(
      () => props.options,
      () => {
        optionsList.value = JSON.parse(JSON.stringify(props.options));
        setFirstText();
      }
    );
    expose({ slideUp });
    return () => (
      <SelectDown
        {...props}
        ref={selectDownEl}
        v-model={showLabel.value}
        onClear={clearClick}
        onDelete={deleteClick}
        onDnput={inputChange}
        onBlur={inputBlur}
        onToggleClick={toggleClick}
      >
        <ul class={[prefixCls]}>
          {
            optionsList.value.length > 0 ? optionsList.value.map((item, index) => {
              return <li
                v-show={!item._disabled}
                key={index}
                class={{
                  disabled: item.disabled,
                  active: getActive(item),
                  [item.class]: item.class
                }}
                title={item[optionsKey.value.label]}
                onClick={($event: MouseEvent) => itemClick(item, $event)}
                v-html={getItemText(item[optionsKey.value.label])}
              >
              </li>;
            })
              : <p class="select-empty-options">{props.emptyText}</p>
          }
        </ul>
        {slots.default && slots.default()}

      </SelectDown>

    );
  },
});
