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
      <div class="inner" style="height:60px">
        <p class="index">{props.index}</p>
        <span>{props.source.name}</span>
        {props.source.desc && <span>{props.source.desc}</span>}
      </div>
    );
  },
});
