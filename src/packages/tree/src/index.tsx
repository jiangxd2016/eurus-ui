import { defineComponent, ref, watch, computed } from 'vue';
import './style.scss';
import { treeProps } from './tree';
import type { TreeNode, TreeOption } from './tree';
import ZTreeNode from './treeNode';

export default defineComponent({
  name: 'ETree',
  props: treeProps,
  setup(props, { slots, emit }) {

    // 有了props 要对用户的数据进行格式化 ，格式化一个固定的结果
    // label , key , children,

    // 我们将props.data 格式化后放到tree中
    const tree = ref<TreeNode[]>([]);

    function createOptions(key: string, label: string, children: string) {
      return {
        getKey(node: TreeOption) {
          return node[key] as string; // 用户传递的key
        },
        getLabel(node: TreeOption) {
          return node[label] as string; // 用户传递label
        },
        getChildren(node: TreeOption) {
          return node[children] as TreeOption[]; // 用户传递的children获取孩子
        }
      };
    }
    const treeOptions = createOptions(
      props.keyField,
      props.labelField,
      props.childrenField
    );
    function createTree(data: TreeOption[]) {
      function traversal(data: TreeOption[], parent: TreeNode | null = null) {
        return data.map((node) => {
          const children = treeOptions.getChildren(node) || [];
          const treeNode: TreeNode = {
            key: treeOptions.getKey(node),
            label: treeOptions.getLabel(node),
            children: [], // 默认为空
            rawNode: node,
            level: parent ? parent.level + 1 : 0,
            // 判断节点是否自带isLeaf 如果自带了 以自带的为准，如果没有自带的则看一下有没有children属性
            // 对 ||的增强操作  ?.  ??
            isLeaf: node.isLeaf ?? children.length === 0
          };
          if (children.length > 0) {
            // 有孩子再去递归孩子，将其格式化成treeNode类型
            treeNode.children = traversal(children, treeNode);
          }
          return treeNode;
        });
      }
      const result: TreeNode[] = traversal(data);
      return result;
    }
    // 监控数据变化，调用格式化方法。 一上来先格式化一次
    watch(
      () => props.data,
      (data: TreeOption[]) => {
        tree.value = createTree(data);
      },
      { immediate: true }
    );

    // 希望将一颗树拍平， 点击还能实现展开操作
    // 默认

    // 需要展开的key 有哪些
    const expandedKeysSet = ref(new Set(props.defaultExpandedKeys));

    const flattenTree = computed(() => {
      const expandedKeys = expandedKeysSet.value; // 要展开的keys有哪些
      // 最终拍平的节点
      const flattenNodes: TreeNode[] = []; // 这个就是拍平后的结果
      const nodes = tree.value || []; // 被格式化后的节点
      const stack: TreeNode[] = []; // 用于遍历树的栈  [40,30,31,32,41]
      // [40, 41]
      for (let i = nodes.length - 1; i >= 0; --i) {
        stack.push(nodes[i]);
      }
      // [41,50,40,30]
      // 深度遍历
      while (stack.length > 0) {
        const node = stack.pop();
        if (!node) { continue; }
        flattenNodes.push(node);
        if (expandedKeys.has(node.key)) {
          const children = node.children; // [30,31,32];
          if (children) {
            for (let i = node.children.length - 1; i >= 0; --i) {
              stack.push(node.children[i]);
            }
          }
        }
      }
      return flattenNodes;
    });

    function isExpanded(node: TreeNode): boolean {
      return expandedKeysSet.value.has(node.key);
    }
    // 折叠功能
    function collpase(node: TreeNode) {
      expandedKeysSet.value.delete(node.key);
    }
    // 展开功能
    function expand(node: TreeNode) {
      expandedKeysSet.value.add(node.key);
    }
    // 切换专刊
    function toggleExpand(node: TreeNode) {
      const expandKeys = expandedKeysSet.value;
      if (expandKeys.has(node.key)) {
        collpase(node);
      } else {
        expand(node);
      }
    }
    return () => (
      <div>
        {
          flattenTree.value.map(node => (
            <ZTreeNode
              node={node}
              key={node.key}
              expanded={isExpanded(node)}
              onToggle={toggleExpand}
            />
          ))
        }
      </div>

    );
  },
});
