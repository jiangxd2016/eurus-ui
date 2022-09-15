import { computed, defineComponent, inject, onMounted, provide, reactive, toRaw } from 'vue';
import Schema from 'async-validator';

import { getPrefixCls } from '@/packages/_utils/global-config';
import './style.scss';

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
  required: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'EFormItem',
  props: EFormItemProps,
  setup(props, { slots, emit, expose }) {
    const fromPrefixCls = getPrefixCls('form');
    const clsPrefix = getPrefixCls('form-item');
    const formProps: any = inject(`${fromPrefixCls}FormProps`, {});
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
    // formItem设置值时使用formItem的，否则使用form的
    const getFormProps = (params: string, defaultValue: any) => {
      const itemProps = (props as any)[params];
      if (itemProps === defaultValue // formItem没有设置，返回form的
        && formProps && Object.keys(formProps).length > 0) {
        return formProps[params];
      }
      return itemProps;
    };
    const state = reactive<any>({
      errorTips: '', // 有值时表示校验没通过有错误信息
      iconType: '', // 提示类型，
      rules,
      trigger: getFormProps('trigger', 'change'),
      messageShow: getFormProps('showMessage', true),
      controlValue: '', // 组件的值，改变事件时*/
    });
    // // 手动自定义错误设置
    // const setError = (error: string) => {
    //   if (error) {
    //     state.errorTips = error;
    //     state.iconType = 'icon-failure';
    //   }
    // };

    // const isRequired = computed(() => {
    //   let bool = false;
    //   const required = getFormProps('required', true);
    //   if (required && state.rules && state.rules.length > 0) {
    //     state.rules.forEach((item: any) => {
    //       if (item.type === 'required') {
    //         bool = true;
    //         return false;
    //       }
    //     });
    //   }
    //   return bool;
    // });
    // 如果form组件设置了label的宽
    const labelStyle = computed<any>(() => {
      const width = getFormProps('labelWidth', undefined);
      if (width) {
        return {
          width
        };
      } else {
        return null;
      }
    }, {});
    function doValidate(value: any, rules: any) {

      const rawRules = toRaw(rules);
      rawRules.forEach((rule: any) => {
        if (rule.trigger) {
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
      value = value || state.controlValue;

      return new Promise((resolve, reject) => {
        if (state.rules) {
          doValidate(value, state.rules).then((result) => {
            if (result) {
              // 通过
              state.errorTips = '';
              state.iconType = 'icon-success';
              resolve(state.controlValue);
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
          resolve(state.controlValue);
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
    const getFormItemFields: any = inject(`${fromPrefixCls}GetFormItemFields`, '');
    const getAllFormItemFields = () => {
      if ( getFormItemFields) {
        getFormItemFields({
          validate,
          clear: clearTips,
          reset,
          prop: props.prop || `prop${Date.now()}` // 当有prop时随机添加一个
        });
      }
    };
    provide(`${fromPrefixCls}ControlChange`, (val: any, type: string) => {
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
    });
    onMounted(() => {
      getAllFormItemFields();
    });

    function reset() {
      const modelValue = getFormProps('model', undefined);
      modelValue[props.prop] = '';
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
