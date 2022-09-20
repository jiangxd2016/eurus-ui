<template>
  <div relative font-sans h-screen p2 text="center gray-700 dark:gray-200">
    <ETabs v-model="tabsIndex">
      <ETabPane label="用户管理">人生若只如初见，何事秋风悲画扇</ETabPane>
      <ETabPane label="配置管理" :disabled="true">众里寻他千百度，蓦然回首，那人却在，灯火阑珊处</ETabPane>
      <ETabPane label="角色管理">问世间情为何物，直教生死相许</ETabPane>
      <ETabPane label="定时任务补偿">同是天涯沦落人，相逢何必曾相识</ETabPane>
    </ETabs>

    <ETree v-model="value" :data="data" />

    <div>
      <div class="tooltip-demo">
        <e-tooltip content="提示语的左边位置跟当前标签对齐，如提示语X轴位置到浏览器右边的距离小于最大宽，将以最小宽显示并换行">
          上左
        </e-tooltip>
        <e-tooltip
          content="上边提示是根据是根据当前标签中间位置，向左偏移50%实现居中，如果当前标签到浏览器右边的距离小于最大宽时，实际显示宽为到边浏览器右边的距离，并不是最大宽"
          direction="top"
        >
          上边
        </e-tooltip>
        <e-tooltip content="这里跟上左类型，计算的是到浏览器左边的距离" direction="top-right" :max-width="200">
          上右
        </e-tooltip>
      </div>
      <div class="tooltip-demo">
        <e-tooltip direction="left" content="受当前标签到浏览器左边的距离影响">
          左边
        </e-tooltip>
        <span />
        <e-tooltip direction="right" content="受当前标签到浏览器左边的距离影响" :max-width="200">
          右边
        </e-tooltip>
      </div>
      <div class="tooltip-demo">
        <e-tooltip direction="bottom-left" content="这是提示内容，如果内容超过设定的最大宽时则自动换行。">
          下左
        </e-tooltip>
        <e-tooltip direction="bottom" content="这是提示内容，如果内容超过设定的最大宽时则自动换行。如果内容超过设定的最大宽时则自动换行">
          <span>下边</span>
        </e-tooltip>
        <e-tooltip direction="bottom-right" content="这是提示内容，如果内容超过设定的最大宽时则自动换行。这是提示内容，如果内容超过设定的最大宽时则自动换行。">
          <span>下右</span>
        </e-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tabsIndex = ref('tab-4');

const value = ref('gd');
const data = [
  {
    id: 'gd',
    label: '广东',
    children: [
      {
        id: 'gz',
        label: '广州',
        children: [
          { id: 'th', label: '天河区' },
          { id: 'by', label: '白云区' },
          { id: 'yx', label: '越秀区' },
          { id: 'hz', label: '海珠区' }
        ]
      },
      { id: 'sz', label: '深圳' },
      { id: 'dg', label: '东莞' },
      { id: 'fs', label: '佛山' }
    ]
  },
  { id: 'gx', label: '广西' },
  { id: 'bj', label: '北京' }
];
</script>
