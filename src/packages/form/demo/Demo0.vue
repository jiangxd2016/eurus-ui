<template>
  <EForm ref="formRef" :model="form" :rules="rules">
    <EFormItem label="姓名" prop="name">
      <EInput v-model="form.name" />
    </EFormItem>
    <EFormItem label="年龄" prop="age">
      <EInputNumber v-model="form.age" />
    </EFormItem>
    <EButton type="primary" @click="submit">提交</EButton>
  </EForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const formRef = ref();
const form = reactive({
  name: '',
  age: null
});

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: ['change', 'blur'] }
  ],
  age: [
    { message: '请输入年龄', required: true },
    { type: 'number', message: 'age must be a number' },
  ]
};

const submit = () => {
  formRef.value && formRef.value.validate().then((valid: boolean) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!!');
    }
  });
};
</script>
