<template>
  <div>
    <e-button @click="setCollapsed">change collapsed</e-button>
    <e-menu :items="items" mode="vertical" />
    <p>dark主题</p>
    <e-menu :items="items" mode="vertical" :collapsed="collapsed" theme="dark" />
  </div>
</template>

<script setup>
import { ref, h } from 'vue';
import { EIcon } from 'eurus-ui';

const items = [
  {
    label: '用户管理',
    key: 'user',
    icon: () => h(EIcon, {
      name: 'star',
      color: '#fff'

    }),
    children: [
      {
        label: '用户列表',
        key: 'aa'
      },
      {
        label: '添加用户',
        key: 'ab'
      }
    ]
  },
  {
    label: 'Navigator Two',
    key: 'b',
    icon: () => h(EIcon, {
      name: 'star',
      color: '#fff'

    }),
    children: [
      {
        label: 'item one',
        key: 'b1',
        children: [
          {
            label: 'item two',
            key: 'b2',
          },
          {
            label: 'item three',
            key: 'b3',
          }
        ]
      },
      {
        label: 'item one',
        key: 'b4',
      },
      {
        label: 'item one',
        key: 'b5',
      }
    ]
  },
  {
    label: '系统设置',
    key: 'set',
    icon: () => h(EIcon, {
      name: 'star',
      color: '#fff'

    }),
    disabled: true
  }
];

const collapsed = ref(false);
const setCollapsed = () => {
  collapsed.value = !collapsed.value;
};
</script>
