<template>
  <ERadioGroup v-model="checkValue" @change="onChange">
    <ERadio label="radio" value="1" />
    <ERadio label="radio" value="2" />
    <ERadio label="radio" value="3" />
  </ERadioGroup>

  <ERadioGroup v-model="checkValue" @change="onChange">
    <ERadio label="radio" value="1" />
    <ERadio label="radio" value="2" disabled />
    <ERadio label="radio" value="3" />
  </ERadioGroup>

  <ERadioGroup v-model="checkValue" disabled @change="onChange">
    <ERadio label="radio" value="1" />
    <ERadio label="radio" value="2" disabled />
    <ERadio label="radio" value="3" />
  </ERadioGroup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkValue = ref('1');
const onChange = (value: boolean) => {
  // console.log('value', value);
};
</script>