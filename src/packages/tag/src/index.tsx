import { defineComponent, ref, } from "vue";
import { getPrefixCls } from '@/packages/_utils/global-config'
const prefixCls = getPrefixCls('tag');
import "./style.scss"
export default defineComponent({
  name:"ETag",
  props: {
    type: { default: "" },
    closable: { type: Boolean, default: false },
    color: { default: "" },
    borderColor: { default: "" },
    bgColor: { default: "" },
    size: { default: "" }
  },
  emits: ["click", "close"],
  setup(props, { slots, emit: emits }) {
    const visible = ref(true);
    const closeClick = () => {
      visible.value = false;
      emits("close");
    };
    const click = () => {
      emits("click");
    };
    return () => <span
      v-show={visible.value}
      class={{
        [`${prefixCls}`]: true,
        [`tag-` + props.type]: props.type,
        [`tag-` + props.size]: props.size
      }}
      style={{ background: props.bgColor, borderColor: props.borderColor, color: props.color }}
      onClick={click}
    >
      {slots?.default && slots.default()}
      {props.closable && <i class="icon-close" onClick={closeClick}></i>}

    </span>
  }
});
