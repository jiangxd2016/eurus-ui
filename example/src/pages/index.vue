<template>
  <div relative font-sans h-screen p2 text="center gray-700 dark:gray-200">
    <e-checkbox v-model="value" />
    <e-input />
    <p>
      <e-radio-group v-model="state.radio1" :options="state.data1" @change="changeGroup" />
    </p>
    <div>
    <e-tag>标签一</e-tag>
    <e-tag type="success">标签二</e-tag>
    <e-tag type="warning">标签三</e-tag>
    <e-tag type="danger">标签四</e-tag>
    <e-tag type="danger" color="#fff" bgColor="#c642e7" borderColor="#c642e7">自定样式</e-tag>
  </div>
  <e-select-down multiple v-model="modelValue" placeholder="placeholder">
    <p>21311</p>
    <p>基础用法</p>
  </e-select-down>
  </div>
</template>

<script setup lang="ts">
const value = ref(false);
const state = reactive({
  radio1: 'a2',
  radio2: 'a3',
  data1: [
    { label: '选项1', value: 'a1' },
    { label: '选项2', value: 'a2' },
    { label: '选项3', value: 'a3' },
    { label: '选项4', value: 'a4' },
    { label: '禁用', value: 'a5', disabled: true }
  ]
});
const changeGroup = (value: any, item: any)=>{

};


const modelValue = ref([])
</script>
