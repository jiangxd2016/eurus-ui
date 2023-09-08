import useEventListener from '@/packages/_hooks/useEventListener';
import { warn } from '@/packages/_utils/warn';
import { noop } from '@/packages/_utils/shared';

/**
 * resize observer hook
 * @param target - target element
 * @param cb - callback
 * @param options - options
 */
export default function useResize(
	target: HTMLElement,
	cb: () => {},
	options?: ResizeObserverOptions | AddEventListenerOptions,
) {
	let observer: ResizeObserver | undefined;
	const isSupported = window && 'ResizeObserver' in window;
	if (!target) {
		warn('useResize', 'target is required');
		return noop;
	}
	if (!isSupported) {
		return useEventListener(target, 'resize', cb, options as AddEventListenerOptions);
	} else {
		observer = new ResizeObserver(cb);
		observer.observe(target, options as ResizeObserverOptions);

		return () => {
			observer?.disconnect();
		};
	}
}
