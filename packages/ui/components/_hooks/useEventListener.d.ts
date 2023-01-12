import type { Fn } from '@/components/_utils/type';
/**
 *  event listener hook
 * @param target - target element
 * @param event - event name
 * @param listener - event listener
 * @param options - event listener options
 */
export default function useEventListener(target: Window | HTMLElement | undefined, event: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): Fn;
