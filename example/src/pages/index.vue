<template>
  <div relative font-sans h-screen p2 text="center gray-700 dark:gray-200">
    <e-checkbox v-model="value" />
    <e-input />
    <p>
      <e-radio-group v-model="state.radio1" :options="state.data1" @change="changeGroup" />
    </p>
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
</script>
