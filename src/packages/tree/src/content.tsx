import { defineComponent, inject } from 'vue';
import { getPrefixCls } from '@/packages/_utils/global-config';
const prefixCls = getPrefixCls('tree');
export default defineComponent({
  name: 'NodeContent',
  props: {
    data: Object
  },
  setup(props) {

    const treeSlots = inject<any>(`${prefixCls}TreeSlots`);
    const propsData = inject<any>(`${prefixCls}PropsData`);
    return ()=>treeSlots?.default && treeSlots.default({ node: props.data, data: propsData.dataList });
  }

});

