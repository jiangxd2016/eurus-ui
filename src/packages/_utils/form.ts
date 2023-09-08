import { inject } from 'vue';
import { formItemKey } from '@/packages/_utils/constants';

export function useFormValidate(condition = true) {
	const formItemFields = inject(formItemKey);
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
