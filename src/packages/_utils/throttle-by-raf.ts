import { caf, raf } from './raf';

export function throttleByRaf(cb: (...args: any[]) => void) {
	let timer = 0;

	const throttle = (...args: any[]): void => {
		if (timer) {
			caf(timer);
		}
		timer = raf(() => {
			// eslint-disable-next-line n/no-callback-literal
			cb(...args);
			timer = 0;
		});
	};

	throttle.cancel = () => {
		caf(timer);
		timer = 0;
	};

	return throttle;
}
