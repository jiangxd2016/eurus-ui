// vue组件的props

import type { ExtractPropTypes, PropType } from 'vue';

type Key = string | number;
export interface TreeNode extends Required<TreeOption> {
  level: number;
  rawNode: TreeOption;
  children: TreeNode[];
  isLeaf: boolean;
  label: string | number;
}
export interface TreeOption {
  label?: Key;
  key?: Key;
  children?: TreeOption[];
  isLeaf?: boolean;
  [key: string]: unknown; // 任意的接口
}
export const treeProps = {
  // props 是仅读的
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  labelField: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  }
} as const;

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    required: true
  }
} as const;

export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node
};

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>;
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;
