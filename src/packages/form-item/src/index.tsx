import type { ExtractPropTypes } from 'vue';
import { computed, defineComponent, inject, onMounted, provide, reactive, toRaw } from 'vue';
import Schema from 'async-validator';

import { formCtxProviderInjectionKey, formItemProviderInjectionKey, getPrefixCls } from '@/packages/_utils/global-config';
import './style.scss';
import { _hasOwnProperty } from '@/packages/_utils/isType';
import { getValue } from '@/packages/_utils/common';
const EFormItemProps = {
  label: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '120px',
  },
  rules: {
    type: Array,
    default: () => [],
  },
  prop: {
    type: String,
    default: ''
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
};
export type FormItemPropsTypes = ExtractPropTypes<typeof EFormItemProps>;

export default defineComponent({
  name: 'EFormItem',
  props: EFormItemProps,
  setup(props, { slots, emit, expose }) {
    const clsPrefix = getPrefixCls('form-item');
    const formProps = inject(formCtxProviderInjectionKey, undefined);

    const triggerList: string[] = [];
    let formRules;
    if (formProps?.rules && props.prop && formProps.rules[props.prop]) {
      formRules = formProps.rules[props.prop];
    }
    let rules = [...props.rules];
    if (props.rules?.length === 0 && formRules) {
      // 使用form的，formItem没有设置时使用form
      rules = [...formRules];
    }
    if (props.required) {
      rules.push({
        required: true,
        message: `${props.prop}  is required`,
      });
    }

    const state = reactive<any>({
      errorTips: '', // 有值时表示校验没通过有错误信息
      iconType: '', // 提示类型，
      rules,
      messageShow: props.showMessage,
    });

    // 如果form组件设置了label的宽
    const labelStyle = computed<any>(() => {
      const width = formProps?.labelWidth;
      if (width) {
        return {
          width
        };
      } else {
        return null;
      }
    }, {});
    const fieldValue = computed(() => {
      const model = formProps?.model;
      if (!model || !props.prop) {
        return;
      }
      return getValue(model, props.prop);
    });

    function doValidate(value: any, rules: any) {

      const rawRules = toRaw(rules);
      rawRules.forEach((rule: any) => {
        if (rule.trigger) {
          triggerList.push(rule.trigger);
          delete rule.trigger;
        }
      });

      const validator = new Schema({ [props.prop]: rawRules });
      return validator.validate({ [props.prop]: value || '' }, { firstFields: true }).then(() => {
        return true as const;
      })
        .catch((err) => {
          return Promise.reject(err);
        });

    }

    const validate = (value: any) => {

      value = value || fieldValue.value;
      return new Promise((resolve, reject) => {
        if (state.rules) {
          doValidate(value, state.rules).then((result) => {
            if (result) {
              // 通过
              state.errorTips = '';
              state.iconType = 'icon-success';
              resolve(value);
            }
          }, (err) => {
            // 默认取第一个信息
            state.errorTips = err?.errors[0]?.message;
            state.iconType = 'icon-failure';
            reject(state.errorTips);
          }
          );

        } else {
          // 没有校验规则
          resolve(value);
        }
      });
    };
    const focusTips = (value: any) => {
      let typeTips = '';
      state.rules.forEach((item: any) => {
        if (item.type === 'tips') {
          typeTips = item.msg;
        }
      });
      if (typeTips && !value) {
        // 没有值时才提示
        state.errorTips = typeTips;
        state.iconType = 'icon-tips';
      }
    };
    // 清空输入提示，恢复初始状态
    const clearTips = () => {
      state.errorTips = '';
      state.iconType = '';
    };
    const addFormItemFIeld: any = formProps?.addFormItemFIeld;
    const getAllFormItemFields = () => {
      if (addFormItemFIeld) {
        addFormItemFIeld({
          validate,
          clear: clearTips,
          reset,
          prop: props.prop || `prop${Date.now()}` // 当有prop时随机添加一个
        });
      }
    };
    /**
 *
 *
 *
 * (val: any, type: string) => {
      // if (props.type) {
      //   emits('update:modelValue', val);
      // }
      state.controlValue = val;
      // 将组件值存起来，不触发其他操作，在没有手动触发时也使用validate来校验
      if (type === 'mounted') {
        return;
      }
      if (type === 'focus') {
        focusTips(val);
      } else if (state.trigger === 'blur') {
        // 失去焦点校验
        if (type === 'blur') {
          validate(val).catch((res) => {
            // console.log(res);
          });
        }
      } else {
        validate(val).catch((res) => {
          // console.log(res);
        });
      }
    }
 */
    provide(formItemProviderInjectionKey, reactive({
      validate,
      clear: clearTips,
      focusTips,
      reset,

      triggerList
    }));
    onMounted(() => {
      getAllFormItemFields();
    });

    function reset() {
      const modelValue = formProps?.model;
      if (modelValue) {
        modelValue[props.prop] = '';
      }
    }
    expose({ validate, clearTips });
    return () => (
      <div class={[clsPrefix]}>
        <label class={['label', props.required ? ' is-required' : '']} style={labelStyle.value}>{props.label}</label>

        <div class='content'>
          {slots.default?.()}
          <div class='error' style={`visibility:${state.errorTips ? 'visible' : 'hidden'}`}>{state.errorTips}</div>
        </div>
      </div>

    );
  },
});
