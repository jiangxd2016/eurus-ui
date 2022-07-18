const globalNodes: Element[] = [];

// TODO: complite replace
// @ts-expect-error
let globalTarget = import.meta.env.SSR
  ? null
  : document.body;

export function createGlobalNode(id: string, target: HTMLElement | null = null) {
  const el = document.createElement('div');

  if (id) {
    el.id = id;
  }

  (target || globalTarget)?.append(el);
  globalNodes.push(el);

  return el;
}

export function removeGlobalNode(el: HTMLElement) {
  globalNodes.splice(globalNodes.indexOf(el), 1);
  el.remove();
}

export function changeGlobalNodesTarget(el: HTMLElement) {
  if (el !== globalTarget) {
    globalTarget = el;

    globalNodes.forEach((el) => {
      if (el.contains(globalTarget) === false) {
        globalTarget!.append(el);
      }
    });
  }
}
