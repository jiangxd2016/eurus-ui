<template>
  <div relative font-sans h-screen p2 text="center gray-700 dark:gray-200">
    <ETabs v-model="tabsIndex">
      <ETabsPane label="用户管理">人生若只如初见，何事秋风悲画扇</ETabsPane>
      <ETabsPane label="配置管理" :disabled="true">众里寻他千百度，蓦然回首，那人却在，灯火阑珊处</ETabsPane>
      <ETabsPane label="角色管理">问世间情为何物，直教生死相许</ETabsPane>
      <ETabsPane label="定时任务补偿">同是天涯沦落人，相逢何必曾相识</ETabsPane>
    </ETabs>

    <ETree :data="data" />
  </div>
</template>

<script setup lang="ts">
const tabsIndex = ref('tab-4');

const data = [
  {
    label: '广东',
    children: [
      {
        label: '广州',
        children: [
          { label: '天河区' },
          { label: '白云区' },
          { label: '越秀区' },
          { label: '海珠区' }
        ]
      },
      { label: '深圳' },
      { label: '东莞' },
      { label: '佛山' }
    ]
  },
  { label: '广西' },
  { label: '北京' }
];
</script>
