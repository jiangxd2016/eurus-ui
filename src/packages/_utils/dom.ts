export const scrollTop = (element: HTMLElement | Document = document.body) => {
  const el = isDocument(element) ? document.documentElement : element;
  return el.scrollTop;
};

export function isDocument (node: Node): node is Document {
  return node.nodeName === '#document';
}
