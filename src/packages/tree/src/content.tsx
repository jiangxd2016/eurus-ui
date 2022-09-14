import { defineComponent, inject } from 'vue';
import { getPrefixCls } from '@/packages/_utils/global-config';
export default defineComponent({
  name: 'NodeContent',
  props: {
    data: Object
  },
  setup(props) {
    const prefixCls = getPrefixCls('tree');

    const treeSlots = inject<any>(`${prefixCls}TreeSlots`);
    const propsData = inject<any>(`${prefixCls}PropsData`);
    return ()=>treeSlots?.default && treeSlots.default({ node: props.data, data: propsData.dataList });
  }

});

