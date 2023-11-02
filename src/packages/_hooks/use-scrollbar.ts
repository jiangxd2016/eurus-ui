import type { Ref } from 'vue';
import { computed } from 'vue';
import type { ScrollbarProps } from '../scrollbar';
import { isBoolean } from '../_utils/is';

export const useScrollbar = (scrollbar: Ref<ScrollbarProps | boolean>) => {
	const displayScrollbar = computed(() => Boolean(scrollbar.value));

	const scrollbarProps = computed(() => {
		if (!scrollbar.value) {
			return undefined;
		}
		return {
			type: 'embed',
			...(isBoolean(scrollbar.value) ? undefined : scrollbar.value),
		} as ScrollbarProps;
	});

	return {
		displayScrollbar,
		scrollbarProps,
	};
};
