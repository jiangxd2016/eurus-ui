<template>
  <div relative font-sans h-screen p2 text="center gray-700 dark:gray-200">
    <e-breadcrumb :data="data" separator="/" />
    <EForm ref="formEl" :data="formData" :rules="rules" :inline="true" :initial="false" @submit.prevent="submit">
      <EFormItem label="年龄" prop="age" required>
        <EInput v-model="formData.age" type="text" />
      </EFormItem>
      <EFormItem label="姓名" prop="name" required>
        <EInput v-model="formData.name" type="text" />
      </EFormItem>
      <EFormItem label="国籍" prop="country">
        <EInput v-model="formData.country" type="text" />
      </EFormItem>
      <EFormItem label="地址" prop="address">
        <EInput v-model="formData.address" type="text" />
      </EFormItem>
      <div flex="~ gap-5" justify-center items-center m-t-5 w-full>
        <EButton type="primary" :native="{ type: 'submit' }">
          提交
        </EButton>
        <EButton type="info" @click="formEl.$reset()">
          清除错误
        </EButton>
        <EButton type="purple" @click="formEl.$clear()">
          清空数据
        </EButton>
      </div>
    </EForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { title: '首页', href: '/' },
  { title: '组件演示1', href: '/' },
  { title: '组件演示2', href: '/breadcrumb' },
  { title: '面包屑' }
]);
const formEl = ref();
const formData = reactive({
  age: '',
  name: 'jack',
  country: '中国',
  address: 'zhejiang',

});
const rules = {
  age: [
    {
      required: true,
      validator(rule: any, value: string) {
        if (!value) {
          return new Error('需要年龄');
        } else if (!/^\d*$/.test(value)) {
          return new Error('年龄应该为整数');
        } else if (Number(value) < 18) {
          return new Error('年龄应该超过十八岁');
        }
        return true;
      },
      trigger: ['input', 'blur']
    }
  ],
  name: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
};
function submit() {
  /* eslint no-alert: "off" */
  if (formEl.value.getStatus()) {
    alert('Submission successful');
  }
}
</script>
