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
      <e-tag type="danger" color="#fff" bg-color="#c642e7" border-color="#c642e7">自定样式</e-tag>
    </div>
    <e-select-down v-model="modelValue" multiple placeholder="placeholder">
      <p>21311</p>
      <p>基础用法</p>
    </e-select-down>

    <p>
      <e-select v-model="value1" placeholder="请选择" :options="options" />
    </p>
    <p>
      <e-select v-model="value2" placeholder="请选择" :options="options" />
    </p>
    <p>
      <e-select v-model="value3" placeholder="禁用状态不能选择" :options="options" :disabled="true" />
    </p>
    <div>
      <e-textarea v-model="textarea1" placeholder="placeholder" />
    </div>

    <e-upload :action="action" @success="success">
      <e-button type="primary">图片上传</e-button>
    </e-upload>
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
const changeGroup = (value: any, item: any) => {

};

const modelValue = ref([]);
const textarea1 = ref('');
const options = ref([
  { label: '选项1', value: 1 },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4', disabled: true },
  { label: '选项5', value: '5' },
  { label: '6' },
  { label: '选项7', value: '7' },
  { label: '选项8', value: '8' },
  { label: '选项9', value: '9' },
  { label: '选项10', value: '10', class: 'red' }
]);
const value1 = ref(1);
const value2 = ref('2');
const value3 = ref('');
const value4 = ref(value2.value);

const action = 'http://localhost/upload/upload.php';

// 更新上传的文件地址为服务器返回的地址，同时更新状态2＝上传成功
const success = (res: any, callback: any) => {
  callback(res.data, 2);
};
</script>
