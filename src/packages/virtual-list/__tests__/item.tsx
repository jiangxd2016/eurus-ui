import { defineComponent } from 'vue';
const ItemProps = {
  index: {
    type: Number
  },
  source: {
    type: Object,
    default() {
      return {};
    }
  },
  otherProp: {
    type: String
  }
};

export default defineComponent({
  name: 'Item',
  props: ItemProps,
  setup(props) {
    return () => (
      <div class="inner">
        <span class="index">{props.index}</span>
        <span class="source">{props.source.text}</span>
        <span class="other">{props.otherProp}</span>
      </div>
    );
  },
});
