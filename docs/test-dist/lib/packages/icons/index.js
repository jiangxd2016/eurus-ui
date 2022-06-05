(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.index = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

  var loading = vue.defineComponent({
    name: "LoadingIcon",
    render() {
      return vue.createVNode("svg", {
        "width": "100%",
        "height": "100%",
        "viewBox": "0 0 24 24"
      }, [vue.createVNode("path", {
        "fill": "currentColor",
        "d": "M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z",
        "opacity": ".5"
      }, null), vue.createVNode("path", {
        "fill": "currentColor",
        "d": "M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
      }, [vue.createVNode("animateTransform", {
        "attributeName": "transform",
        "dur": "0.5s",
        "from": "0 12 12",
        "repeatCount": "indefinite",
        "to": "360 12 12",
        "type": "rotate"
      }, null)])]);
    }
  });

  exports.LoadingIcon = loading;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
