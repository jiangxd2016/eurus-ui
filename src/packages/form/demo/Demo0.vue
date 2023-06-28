<template>
  <EForm ref="formRef" :model="form" :rules="rules" disabled inline>
    <EFormItem label="姓名" prop="name">
      <EInput v-model="form.name" />
    </EFormItem>
    <EFormItem label="年龄" prop="age">
      <EInputNumber v-model="form.age" />
    </EFormItem>
    <EFormItem label="性别" prop="sex">
      <ESelect v-model="form.sex">
        <EOption value="1" label="基础用法1">男</EOption>
        <EOption value="2" label="基础用法2">女</EOption>
        <EOption value="3" label="基础用法3">未知</EOption>
        <EOption value="4" label="基础用法4">双性人</EOption>
      </ESelect>
    </EFormItem>

    <EFormItem label="位置" prop="city">
      <ERadioGroup v-model="form.city">
        <ERadio label="国内" value="1" />
        <ERadio label="国外" value="3" />
        <ERadio label="火星" value="2" disabled />
      </ERadioGroup>
    </EFormItem>
    <EFormItem label="时间" prop="date">
      <EDatePicker v-model="form.date" />
    </EFormItem>

    <EFormItem label="天气" prop="weather">
      <ESwitch v-model="form.weather" checked-label="好" unchecked-label="不好" />
    </EFormItem>
    <EFormItem label="详细地址" prop="address">
      <ETextarea v-model="form.address" placeholder="text" visible-word-limit :maxlength="20" />
    </EFormItem>
    <EFormItem>
      <EButton type="primary" @click="submit">提交</EButton>
      <EButton type="primary" @click="reset">重置</EButton>
    </EFormItem>
  </EForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const formRef = ref();
const form = reactive({
  name: '',
  age: null,
  sex: '1',
  city: '',
  date: '',
  weather: '',
  address: '',
});

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: ['change', 'blur'] }],
  age: [
    { message: '请输入年龄', required: true, trigger: ['change', 'blur'] },
    { type: 'number', message: 'age must be a number' },
  ],
  sex: [
    {
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        if (value === '4') {
          callback(new Error('双性人不允许'));
        } else {
          callback();
        }
      },
      trigger: ['change', 'blur'],
    },
  ],
  city: [{ required: true, message: '请选择位置', trigger: ['change', 'blur'] }],
  date: [{ required: true, message: '请选择时间', trigger: ['change', 'blur'] }],
  weather: [{ required: true, message: '请选择好天气', trigger: ['change', 'blur'] }],
  address: [{ required: true, message: '请输入详细地址', trigger: ['change', 'blur'] }],
};

const submit = () => {
  formRef.value &&
    formRef.value.validate().then((valid: boolean) => {
      if (valid) {
        // console.log('submit!');
      } else {
        // console.log('error submit!!');
      }
    });
};

const reset = () => {
  formRef.value && formRef.value.resetForm();
};
</script>
