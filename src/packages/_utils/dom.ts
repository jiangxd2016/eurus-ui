import { noop } from '@/packages/_utils/shared';

export const scrollTop = (element: HTMLElement | Document = document.body) => {
  const el = isDocument(element) ? document.documentElement : element;
  return el.scrollTop;
};

export function isDocument (node: Node): node is Document {
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
    options: boolean | AddEventListenerOptions = false
  ) => {
    element.addEventListener(
      event,
      handler as EventListenerOrEventListenerObject,
      options
    );
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
    options: boolean | EventListenerOptions = false
  ) => {
    element.removeEventListener(
      type,
      handler as EventListenerOrEventListenerObject,
      options
    );
  };
})();
