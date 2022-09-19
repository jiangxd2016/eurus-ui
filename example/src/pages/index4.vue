<template>
  <div>
    <p>
      <e-button @click="state.showHeader = !state.showHeader">
        显示表头:{{ state.showHeader }}
      </e-button>
      <e-button @click="state.hover = !state.hover">hover高亮:{{ state.hover }}</e-button>
      <e-button @click="state.border = !state.border">显示边框:{{ state.border }}</e-button>
      <e-button @click="state.stripe = !state.stripe">显示斑马线:{{ state.stripe }}</e-button>
      <e-button @click="state.ellipsis = !state.ellipsis">
        溢出省略号:{{ state.ellipsis }}
      </e-button>
      <e-button @click="state.title = !state.title">鼠标滑动过提示:{{ state.title }}</e-button>
      <e-button @click="state.dragLine = !state.dragLine">
        拖动改变列宽时垂直线:{{ state.dragLine }}
      </e-button>
    </p>
    <e-table
      :data="tableData"
      :show-header="state.showHeader"
      :hover="state.hover"
      :border="state.border"
      :stripe="state.stripe"
      :ellipsis="state.ellipsis"
      :drag-line="state.dragLine"
      :columns="columns"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import tableData from './demoJs.json';

const state = reactive({
  showHeader: true,
  hover: true,
  border: true,
  stripe: true,
  ellipsis: true,
  title: true,
  dragLine: true
});
const columns = [
  { type: 'selection' },
  { type: 'index', label: '序号' },
  { label: '日期', prop: 'date' },
  { label: '姓名', prop: 'name' },
  { label: '性别', prop: 'sex' },
  { label: '省份', prop: 'province' },
  { label: '城市', prop: 'city' },
  { label: '地址', prop: 'address' },
  { label: '操作', prop: 'control' },
  { type: 'extend', prop: 'extend' },
];
</script>
