import { defineComponent, provide, ref, toRefs, watch } from 'vue';
import type { VNode, PropType } from 'vue';
import './style.scss';
import Schema from 'async-validator';
import { getPrefixCls } from '@/packages/_utils/global-config';
const EFormProps = {
  data: {
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

    const prefix = getPrefixCls('form');
    const children: VNode[] = slots.default?.() || [];
    const formData = props.data;
    const formField: VNode[] = children.filter((child) => {

      const type = child.type as string | { name: string };
      if (typeof type === 'string' || type?.name !== 'formField') { return false; }
      const errorMsg = ref('');
      return Object.assign(child.props || {}, { errorMsg });
    });

    let oldFormData = { ...formData };
    watch(formData, () => {
      emitSingleProp(formField, formData, diffKey(oldFormData, formData));
      oldFormData = { ...formData };
    });

    function reset() {
      clearStatus(formField);
    }
    function clear() {
      for (const key in formData) {
        if (key === 'rules') { continue; }
        formData[key] = '';
      }
      emitProps(formField, formData);
    }
    function getStatus() {
      emitProps(formField, formData);
      return !formField.some(child => child.props?.errorMsg.value);
    }

    function doValidate(formData: Record<string, any>, key: any) {
      const rules = props?.rules[key];
      const validator = new Schema({ [key]: rules });
      return validator.validate({ [key]: formData[key] }).then(() => {
        return true as const;
      })
        .catch((err) => {
          return Promise.reject(err);
        });

    }

    function clearStatus(formField: VNode[]) {
      formField.forEach((child) => {
        const errorMsg = child.props?.errorMsg;
        errorMsg.value = '';
      });
    }

    function emitProps(formField: VNode[], formData: any) {
      clearStatus(formField);
      for (const key in formData) {
        emitSingleProp(formField, formData, key);
      }

    }

    function emitSingleProp(formField: VNode[], formData: any, key: string) {
      if (!key) { return; }
      const msg = doValidate(formData, key).then();
      if (msg === undefined) { return; }

      return formField.some((child) => {
        const { prop, errorMsg } = child.props!;
        if (prop === key) {
          errorMsg.value = msg;
          return true;
        }
        return false;
      });
    }

    function diffKey(v1: Record<string, any>, v2: Record<string, any>): string {
      for (const key in v1) {
        if (v1[key] !== v2[key]) { return key; }
      }
      return '';
    }
    provide(`${prefix}-FormProps`, {
      ...toRefs(props),
      emits,

    });
    expose({ $reset: reset, $clear: clear, getStatus });
    return () => (
      <form class={`${prefix}${props.inline ? `${prefix}__inline` : ''}`}>
        {children}
      </form>

    );
  },
});

