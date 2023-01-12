import type { Fn } from '@/components/_utils/type';
import { noop } from '@/components/_utils/shared';

/**
 *  event listener hook
 * @param target - target element
 * @param event - event name
 * @param listener - event listener
 * @param options - event listener options
 */
export default function useEventListener(target: HTMLElement | Window = window, event: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): Fn {

  if (!event || !listener) {
    return noop;
  }
  if (!target.addEventListener) {
    return noop;
  }

  target.addEventListener(event, listener, options);

  return () => {
    target.removeEventListener(event, listener, options);
  };
}

