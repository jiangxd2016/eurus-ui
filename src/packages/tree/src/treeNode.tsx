import { inject, computed, reactive, nextTick, defineComponent } from 'vue';
import VTransition from '../../transition/Transition';
import Loading from '../../loading';
import { ECheckbox } from '../../checkbox';
import NodeContent from './content';
import Icon from '@/packages/icons';
import { getPrefixCls } from '@/packages/_utils/global-config';
interface TreeList {
  id: string;
  label: string;
  open?: boolean;
  children?: any;
  tid?: string;
  hasChild?: boolean;
  checked?: boolean;
  someChecked?: boolean;
  isLoad?: boolean;
}
interface StateReactive {
  lazy: boolean;
  showCheckbox: boolean;
  itemRefs?: string[];
  loadingId: string;
}
/**
 *
 *  (e: 'toggle', item: any, callback?: any): void;
 */
const TreeNode = defineComponent({
  props: {
    tid: String
  },
  emits: ['toggle'],
  setup(props, { slots, emit, expose }) {
    const prefixCls = getPrefixCls('tree');
    const propsData = inject(`${prefixCls}PropsData`) as any;
    const state = reactive<StateReactive>({
      lazy: propsData.lazy,
      showCheckbox: propsData.showCheckbox,
      loadingId: ''
    });
    const dataTree = computed(() => {
      return propsData.dataList.filter((item: any) => {
        return item.tid === props.tid;
      });
    });
    const slideToggle = (item: TreeList) => {
      if (state.loadingId) {
        // 表示正在加载中
        return;
      }
      item.open = !item.open;
      if (propsData.lazy && item.hasChild) {
        state.loadingId = item.id;
      }
      emit('toggle', item, () => {
        if (propsData.lazy && item.hasChild) {
          state.loadingId = '';
        }
      });
    };
    const selected = (item: TreeList) => {
      if (typeof propsData.modelValue === 'object') {
        return propsData.modelValue.includes(item.id);
      } else {
        return propsData.modelValue === item.id && item.id;
      }
    };
    const slideToggleChild = (item: TreeList) => {
      emit('toggle', item);
    };
    const change = inject(`${prefixCls}CheckboxChange`) as (
      item: TreeList
    ) => void;
    const checkboxChange = (item: TreeList) => {
      nextTick(() => {
        change && change(item);
      });
    };

    return () => (
      <VTransition >
        <ul>
          {
            dataTree.value.map((item: any) => {
              return <li key={item.id}>
                <span onClick={() => slideToggle(item)} class={{ 'tree-box': true, 'has-child': item.hasChild, 'selected': selected(item) }}>
                  <Icon size="14" class={{ 'icon': true, 'open-child': item.open }} name="triangleRightFill" />
                  {state.showCheckbox && <ECheckbox
                    v-model={item.checked
                    } class={{ 'some-select': item.someChecked }}
                   onClick={(e: Event) => e.stopPropagation()} onChange={() => checkboxChange(item)}
                  />}
                  <span class="tree-label">{item.label}</span>
                  {state.lazy && item.hasChild && <span class="lazy-loading">
                    <Loading key={item.id} model-value={item.id === state.loadingId} />
                  </span>}
                  <NodeContent data={item} />
                </span>
                {item.hasChild
                  && <TreeNode v-show={item.open} key={item.id} tid={item.id} onToggle={slideToggleChild} />
                }
              </li>;
            })
          }
        </ul>
      </VTransition>
    );
  }
});
export default TreeNode;
