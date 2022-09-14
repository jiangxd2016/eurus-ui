import { defineComponent, ref } from 'vue';
import { getPrefixCls } from '@/packages/_utils/global-config';
import './style.scss';

const EFormItemProps = {
  label: {
    type: String,
  },
  width: {
    type: String,
    default: '120px',
  },
  errorMsg: {
    type: Object,
    default: () => ({}),
  },
  required: {
    type: Boolean,
  },
};
export const formItemValidateStates = [
  '',
  'error',
  'validating',
  'success',
] as const;
export type FormItemValidateState = typeof formItemValidateStates[number];

export default defineComponent({
  name: 'EFormItem',
  props: EFormItemProps,
  setup(props, { slots, emit, expose }) {
    const prefix = getPrefixCls('form-item');
    const validateState = ref<FormItemValidateState>('');
    const validateMessage = ref('');
    expose({
      /** @description validation message */
      validateMessage,
      /** @description validation state */
      validateState,
      /** @description validate form item */
      validate,
      /** @description clear validation status */
      clearValidate,
      /** @description reset field value */
      resetField,
    });
    return () => (
      <div class={[prefix]}>
        <label class={['label', props.required ? ' is-required' : '']} style={`width:${props.width?.replace('px', '')}px`}>{props.label}</label>

        <div class='content'>
          {slots.default?.()}
          <div class='error' style={`visibility:${props?.errorMsg.value ? 'visible' : 'hidden'}`}>{props?.errorMsg.value}</div>
        </div>
      </div>

    );
  },
});
