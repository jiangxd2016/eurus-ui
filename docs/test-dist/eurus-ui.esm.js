import { defineComponent, createVNode, reactive, mergeProps } from 'vue';

var LoadingIcon = defineComponent({
  name: "LoadingIcon",
  render() {
    return createVNode("svg", {
      "width": "100%",
      "height": "100%",
      "viewBox": "0 0 24 24"
    }, [createVNode("path", {
      "fill": "currentColor",
      "d": "M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z",
      "opacity": ".5"
    }, null), createVNode("path", {
      "fill": "currentColor",
      "d": "M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
    }, [createVNode("animateTransform", {
      "attributeName": "transform",
      "dur": "0.5s",
      "from": "0 12 12",
      "repeatCount": "indefinite",
      "to": "360 12 12",
      "type": "rotate"
    }, null)])]);
  }
});

const BtnProps = {
  type: {
    type: String,
    default: "default"
  },
  size: {
    type: String,
    default: "md"
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  native: {
    type: Object,
    default: {}
  }
};
var EButton = defineComponent({
  name: "EButton",
  props: BtnProps,
  setup(props, {
    slots,
    emit
  }) {
    const classNames = reactive({
      disabled: props.disabled || props.loading,
      plain: props.plain,
      circle: props.circle,
      round: props.round,
      [`e-button--${props.size}`]: props.size
    });
    const handleClick = (e) => {
      if (props.disabled || props.loading) {
        return false;
      }
      emit("click", e);
    };
    return () => createVNode("button", mergeProps({
      "class": [`e-button e-button--${props.type} bg-${props.type} ${props.type === "default" ? "text-black" : "text-white"}`, classNames]
    }, props.native, {
      "disabled": props.disabled || props.loading,
      "on-click": handleClick
    }), [props.loading && createVNode("span", {
      "class": "loading"
    }, [createVNode(LoadingIcon, null, null)]), slots?.default && createVNode("span", null, [slots?.default?.()])]);
  }
});

EButton.install = (app) => {
  app.component(EButton.name, EButton);
};

var version = "0.0.0";

function create({ componentPrefix = "E", components = [] } = {}) {
  const installTargets = [];
  function registerComponent(app, name, component) {
    const registered = app.component(componentPrefix + name);
    if (!registered) {
      app.component(componentPrefix + name, component);
    }
  }
  function install(app) {
    if (installTargets.includes(app)) {
      return;
    }
    installTargets.push(app);
    components.forEach((component) => {
      const { name, alias } = component;
      registerComponent(app, name, component);
      if (alias) {
        alias.forEach((aliasName) => {
          registerComponent(app, aliasName, component);
        });
      }
    });
  }
  return {
    version,
    componentPrefix,
    install
  };
}

export { EButton, create };
