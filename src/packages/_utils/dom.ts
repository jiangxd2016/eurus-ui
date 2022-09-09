interface Offset {
  width: number;
  height: number;
  left: number;
  top: number;
}

const scrollTop = () => {
  // 滚动条的位置
  return document.documentElement.scrollTop || document.body.scrollTop;
};
const getOffset = (el: HTMLElement): Offset => {
  const componentRect: DOMRect = el.getBoundingClientRect();
  const top
    = componentRect.top
    + (window.pageYOffset || document.documentElement.scrollTop)
    - (document.documentElement.clientTop || 0);
  const left
    = componentRect.left
    + (window.pageXOffset || document.documentElement.scrollLeft)
    - (document.documentElement.clientLeft || 0);
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  return { left, top, width, height };
};
const getWindow = () => {
  // 返回窗口宽高
  const width
    = document.documentElement.clientWidth || document.body.clientWidth;
  const height
    = document.documentElement.clientHeight || document.body.clientHeight;
  return { width, height };
};
const getScrollbarWidth = (bool?: boolean) => {
  // 取滚动条的宽
  const hasScroll
    = document.body.scrollHeight
    > (window.innerHeight || document.documentElement.clientHeight);
  const scrollDiv: HTMLDivElement = document.createElement('div');
  scrollDiv.style.cssText
    = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.append(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  scrollDiv.remove();
  if (bool) {
    return { hasScroll, width: scrollbarWidth };
  } else {
    return scrollbarWidth;
  }
};
const hasClass = (elements: Element, cName = '') => {
  return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));
};
const addClass = (elements: Element, cName = '') => {
  if (!hasClass(elements, cName)) {
    if (elements.className) {
      elements.className += ' ' + cName;
    } else {
      elements.className += cName;
    }
  }
};
const removeClass = (elements: Element, cName = '') => {
  if (hasClass(elements, cName)) {
    elements.className = elements.className.replace(
      new RegExp('(\\s|^)' + cName + '(\\s|$)'),
      ''
    );
  }
};

export {
  scrollTop,
  getOffset,
  getWindow,
  getScrollbarWidth,
  hasClass,
  addClass,
  removeClass
};
