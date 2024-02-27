import { onUpdated, ref } from 'vue';
import type { Slots } from 'vue';

export default function usePickSlots(slots: Slots, slotName: string) {
	const slot = ref(slots[slotName]);

	onUpdated(() => {
		const newSlot = slots[slotName];
		if (slot.value !== newSlot) {
			slot.value = newSlot;
		}
	});

	return slot;
}
