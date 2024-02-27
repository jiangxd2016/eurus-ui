import { noop } from '@/packages/_utils/shared';
import { isString } from './is';

export const NOOP = () => {
	return undefined;
};

interface Offset {
	width: number;
	height: number;
	left: number;
	top: number;
}

export const scrollTop = (element: HTMLElement | Document = document.body) => {
	const el = isDocument(element) ? document.documentElement : element;
	return el.scrollTop;
};

export function isDocument(node: Node): node is Document {
	return node.nodeName === '#document';
}
export const isServerRendering = (() => {
	try {
		return !(typeof window !== 'undefined' && document !== undefined);
	} catch {
		return true;
	}
})();

export const on = (() => {
	if (isServerRendering) {
		return noop;
	}
	return <K extends keyof HTMLElementEventMap>(
		element: HTMLElement | Window,
		event: K,
		handler: (ev: HTMLElementEventMap[K]) => void,
		options: boolean | AddEventListenerOptions = false,
	) => {
		element.addEventListener(event, handler as EventListenerOrEventListenerObject, options);
	};
})();

export const off = (() => {
	if (isServerRendering) {
		return noop;
	}
	return <K extends keyof HTMLElementEventMap>(
		element: HTMLElement | Window,
		type: K,
		handler: (ev: HTMLElementEventMap[K]) => void,
		options: boolean | EventListenerOptions = false,
	) => {
		element.removeEventListener(type, handler as EventListenerOrEventListenerObject, options);
	};
})();

export const getOffset = (el: HTMLElement): Offset => {
	const componentRect: DOMRect = el.getBoundingClientRect();
	const top =
		componentRect.top +
		(window.pageYOffset || document.documentElement.scrollTop) -
		(document.documentElement.clientTop || 0);
	const left =
		componentRect.left +
		(window.pageXOffset || document.documentElement.scrollLeft) -
		(document.documentElement.clientLeft || 0);
	const width = el.offsetWidth;
	const height = el.offsetHeight;
	return { left, top, width, height };
};

export const getWindow = () => {
	// 返回窗口宽高
	const width = document.documentElement.clientWidth || document.body.clientWidth;
	const height = document.documentElement.clientHeight || document.body.clientHeight;
	return { width, height };
};

export const querySelector = (selectors: string, container?: Document | HTMLElement) => {
	if (isServerRendering) {
		return NOOP();
	}
	return (container ?? document).querySelector<HTMLElement>(selectors) ?? undefined;
};

export const getElement = (
	target: string | HTMLElement | undefined,
	container?: Document | HTMLElement,
): HTMLElement | undefined => {
	if (isString(target)) {
		const selector = target[0] === '#' ? `[id='${target.slice(1)}']` : target;
		return querySelector(selector, container);
	}
	return target;
};
