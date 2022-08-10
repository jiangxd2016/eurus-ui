import { defineComponent } from 'vue';
import './style.scss';
import { treeNodeEmitts, treeNodeProps } from './tree';

export default defineComponent({
  name: 'ETreeNode',
  props: treeNodeProps,
  emits: treeNodeEmitts,
  setup(props, { slots, emit }) {

    function handleExpand() {
      emit('toggle', props.node);
    }

    const { node, expanded } = props;
    return () => (
      <div class="e-tree-node">
        <div class="e-tree-node__content" style={{ paddingLeft: `${node.level * 16}px` }}>
          <span
            class={
              ['z-tree-node__expand-icon', node.isLeaf && expanded && 'expanded', !node.isLeaf && 'is-leaf']}
            onClick={handleExpand}
          >
            <span>{'>'}</span>
          </span>
          <span>{node?.label}</span>
        </div>
      </div>

    );
  },
});
