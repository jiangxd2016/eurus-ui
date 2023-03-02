import { inject } from 'vue';
import { formItemProviderInjectionKey } from '@/packages/_utils/constants';

export function useFormValidate(condition = true) {
  const formItemFields = inject(formItemProviderInjectionKey);
  const validateEvent = (val: unknown, type = 'change') => {
    if (formItemFields && condition && formItemFields.triggerList.includes(type)) {
      formItemFields.validate(val);
    }
  };
  return {
    formItemFields,
    validateEvent,
  };
}
