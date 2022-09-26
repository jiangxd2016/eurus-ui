import { defineComponent, onMounted, provide, reactive, toRefs, } from 'vue';
import type { PropType } from 'vue';
import './style.scss';
import { formCtxProviderInjectionKey, getPrefixCls } from '@/packages/_hooks/use-global-config';
export const EFormProps = {
  model: {
    type: Object,
    default: () => ({}),
  },
  // 行内表单
  inline: {
    type: Boolean,
    default: false,
  },
  // 是否是禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // label 宽度
  labelWidth: {
    type: String,
    default: '120px',
  },
  // label 位置 left center right
  labelAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
};

export default defineComponent({
  name: 'EForm',
  props: EFormProps,
  setup(props, { slots, emit: emits, expose }) {

    const prefixCls = getPrefixCls('form');

    const state = reactive({
      defaultValue: '' // 用于保存所有表单元素初始值
    });
    const formItemFields: any = []; // 所有formItem

    const setValue = (obj: any, type?: string) => {
      if (type !== 'reset') {
        state.defaultValue = JSON.stringify(obj);
      }
      Object.assign(props.model, obj);
    };
    // 重置表单元素值
    const resetForm = () => {
      // 将所有提示清空
      formItemFields
        && formItemFields.forEach((item: any) => {
          item.clear();
          item.reset();
        });
    };
    // 清空校验提示
    const clearValidate = () => {
      formItemFields
        && formItemFields.forEach((item: any) => {
          item.clear();
        });
    };
    const validate = (field?: string[]) => {
      const allTips: string[] = [];
      let validateFields = formItemFields;
      if (field && field.length > 0) {
        // 指定校验字段时
        validateFields = formItemFields.filter((fi: any) => {
          return field.includes(fi.prop);
        });
      }
      return new Promise((resolve, reject) => {
        const returnResult = () => {
          if (allTips.length === validateFields.length) {
            const tips = allTips.filter((fi) => {
              return fi !== 'true';
            });
            if (tips.length > 0) {
              // console.log('不通过')
              reject(tips);
            } else {
              resolve(true);
            }
          }
        };
        validateFields.forEach((item: any) => {
          // console.log(item.prop)
          item
            .validate()
            .then(() => {
              allTips.push('true');
              returnResult(); // 通过
            })
            .catch((res: string) => {
              allTips.push(res);
              returnResult();
            });
        });

      });
    };
    onMounted(() => {
      setValue(props.model);
    });

    const addFormItemFIeld = (field: any) => {
      formItemFields.push(field);
    };
    provide(formCtxProviderInjectionKey, reactive({
      ...toRefs(props),

      addFormItemFIeld,
    }));
    expose({ validate, clearValidate, resetForm });
    return () => (
      <form class={`${prefixCls}${props.inline ? `${prefixCls}__inline` : ''}`}>
        {slots.default && slots.default()}
      </form>

    );
  },
});

