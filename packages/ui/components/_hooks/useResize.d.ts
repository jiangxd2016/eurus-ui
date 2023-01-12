/**
 * resize observer hook
 * @param target - target element
 * @param cb - callback
 * @param options - options
 */
export default function useResize(target: HTMLElement, cb: () => {}, options?: ResizeObserverOptions | AddEventListenerOptions): () => void;
