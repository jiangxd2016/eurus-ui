<template>
  <EForm ref="formRef" :model="form" :rules="rules">
    <EFormItem label="姓名" prop="name">
      <EInput v-model="form.name" />
    </EFormItem>
    <EButton type="primary" @click="submit">提交</EButton>
  </EForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const formRef = ref();
const form = reactive({
  name: ''
});

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: ['change', 'blur'] }
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
