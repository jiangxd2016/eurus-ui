<template>
  <div>
    <e-menu :items="items" mode="vertical" />
    <p>dark主题</p>
    <e-menu :items="items" mode="vertical" theme="dark" />
  </div>
</template>

<script setup>
const items = [
  {
    label: '用户管理',
    key: 'user',
    icon: 'user',
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
    icon: 'search',
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
    icon: 'date',
    disabled: true
  }
];
</script>
