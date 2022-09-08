import { defineComponent, inject } from 'vue';
import './style.scss';
export default defineComponent({
  name: 'EuTabPane',
  props: {
    className: String,
    label: String,
    name: String,
    disabled: Boolean,
    closable: Boolean
  },
  setup(props, { slots }) {
    const childrenList: any = inject('eu-ChildrenList');
    childrenList && childrenList(Object.assign({}, props, { slots }));
  },
  render() {
    return null;
  }
});
