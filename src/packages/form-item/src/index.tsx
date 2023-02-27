import { computed, defineComponent, inject, onMounted, provide, reactive, toRaw } from 'vue';
import './style.scss';
import Schema from 'async-validator';
import { formCtxProviderInjectionKey, formItemProviderInjectionKey } from '@/packages/_utils/constants';
import { getValue } from '@/packages/_utils/shared';
import { getPrefixCls } from '@/packages/_utils/global-config';

export interface FormItemField {
  prop: string;
  validate: (callback: (error: string) => void) => void;
  clear: () => void;
  reset: () => void;
}

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

export default defineComponent({
  name: 'EFormItem',
  props: EFormItemProps,
  setup(props, { slots, expose }) {
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
    // init triggerList
    rules.forEach((rule: any) => {
      if (rule.trigger) {
        triggerList.push(...[].concat(rule.trigger));
      }
    });
    if (props.required) {
      rules.push({
        required: true,
        message: `${props.prop}  is required`,
      });
    }

    const state = reactive({
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
    const FieldValue = computed(() => {
      const model = formProps?.model;
      if (!model || !props.prop) {
        return;
      }
      return getValue(model, props.prop);
    });

    function doValidate(value: any, rules: any) {
      const rawRules = toRaw(rules);
      const validator = new Schema({ [props.prop]: rawRules });
      return validator.validate({ [props.prop]: value || '' }, { firstFields: true }).then(() => {
        return true;
      }).catch((err) => {
        return Promise.reject(err);
      });

    }

    const validate = (value: any) => {
      value = value || FieldValue.value;
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
    const addFormItemField = formProps?.addFormItemField;
    const getAllFormItemFields = () => {
      if (addFormItemField) {
        addFormItemField({
          validate,
          clear: clearTips,
          reset,
          prop: props.prop || `prop${Date.now()}` // 当有prop时随机添加一个
        });
      }
    };

    provide(formItemProviderInjectionKey, reactive({
      validate,
      clear: clearTips,
      focusTips,
      reset,
      disabled: formProps?.disabled,
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
      <div class={clsPrefix}>
        <label class={['label', props.required ? ' is-required' : '']} style={labelStyle.value}>{props.label}</label>
        <div class="content">
          {slots.default?.()}
          <div class="error" style={`visibility:${state.errorTips ? 'visible' : 'hidden'}`}>{state.errorTips}</div>
        </div>
      </div>
    );
  },
});
