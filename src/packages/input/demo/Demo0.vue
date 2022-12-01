<template>
  <EInput v-model="inputValue" />
  <EInput v-model="inputValue1">
    <template #prefix>
      <EIcon name="star" />
    </template>
    <template #suffix>
      <div>
        suffix
      </div>
    </template>
  </EInput>
  <EInput v-model="inputValue" clearable :change="onInputChange" />
  <EInput v-model="inputValue2" />
  <EInput v-model="inputValue3" disabled type="textarea" />

  <EInput v-model="inputValue3" disabled type="textarea" :max-length="10" show-word-limit />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const inputValue = ref('KFC');
const inputValue1 = ref('fucking crazy Thursday');
const inputValue2 = ref('vme 50');
const inputValue3 = ref('vme 50');

const onInputChange = (value: string) => {
  console.log(value);
};
</script>
