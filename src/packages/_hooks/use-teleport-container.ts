import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { getElement } from '../_utils/dom';

export const useTeleportContainer = ({
	popupContainer,
	visible,
	defaultContainer = 'body',
	documentContainer,
}: {
	popupContainer: Ref<string | HTMLElement | undefined>;
	visible: Ref<boolean>;
	defaultContainer?: string;
	documentContainer?: boolean;
}): {
	teleportContainer: Ref<string | HTMLElement | undefined>;
	containerRef: Ref<HTMLElement | undefined>;
} => {
	const teleportContainer: Ref<string | HTMLElement | undefined> = ref(popupContainer.value);
	const containerRef: Ref<HTMLElement | undefined> = ref();

	const getContainer = () => {
		const element = getElement(popupContainer.value);
		const _teleportContainer = element ? popupContainer.value : defaultContainer;
		const _containerElement =
			element ?? (documentContainer ? document.documentElement : getElement(defaultContainer));
		if (_teleportContainer !== teleportContainer.value) {
			teleportContainer.value = _teleportContainer;
		}
		if (_containerElement !== containerRef.value) {
			containerRef.value = _containerElement;
		}
	};

	onMounted(() => getContainer());

	watch(visible, visible => {
		if (teleportContainer.value !== popupContainer.value && visible) {
			getContainer();
		}
	});

	return {
		teleportContainer,
		containerRef,
	};
};
