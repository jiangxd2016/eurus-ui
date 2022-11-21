export const scrollTop = (element?: HTMLElement) => {
  const el = element || document.documentElement || document.body;
  return el.scrollTop;
};
