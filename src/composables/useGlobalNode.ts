const globalNodes: Element[] = [];

// @ts-expect-error
let target = import.meta.env.SSR
  ? null
  : document.body;

export function createGlobalNode(id: string) {
  const el = document.createElement('div');

  if (id) {
    el.id = id;
  }

  target!.append(el);
  globalNodes.push(el);

  return el;
}

export function removeGlobalNode(el: HTMLElement) {
  globalNodes.splice(globalNodes.indexOf(el), 1);
  el.remove();
}

export function changeGlobalNodesTarget(el: HTMLElement) {
  if (el !== target) {
    target = el;

    globalNodes.forEach((el) => {
      if (el.contains(target) === false) {
        target!.append(el);
      }
    });
  }
}
