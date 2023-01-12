<template>
  <ECheckboxGroup v-model="checkboxGroupValue" @change="onchange">
    <ECheckbox value="A" label="checkboxA" />
    <ECheckbox value="B" label="checkboxB" />
    <ECheckbox value="C" label="checkboxC" />
    <ECheckbox value="D" label="checkboxD" />
  </echeckboxgroup>
  <ECheckboxGroup v-model="checkboxGroupValue" disabled @change="onchange">
    <ECheckbox value="A" label="checkboxA" />
    <ECheckbox value="B" label="checkboxB" />
    <ECheckbox value="C" label="checkboxC" />
    <ECheckbox value="D" label="checkboxD" />
  </echeckboxgroup>
  <ECheckboxGroup v-model="checkboxGroupValue2" @change="onchange">
    <ECheckbox value="A" label="checkboxA" disabled />
    <ECheckbox value="B" label="checkboxB" />
    <ECheckbox value="C" label="checkboxC" disabled />
    <ECheckbox value="D" label="checkboxD" />
  </echeckboxgroup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkboxGroupValue = ref(['A', 'B']);
const checkboxGroupValue2 = ref(['A', 'B']);
const onchange = (value: boolean) => {
  // console.log(value);
};
</script>