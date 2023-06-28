<template>
  <ECheckbox v-model="checkboxValue" label="checkbox" @change="onchange" />
  <ECheckbox v-model="checkboxValue" disabled @change="onchange">checkbox2</ECheckbox>
  <ECheckbox v-model="checkboxValue2" value="check" @change="onchange">checkbox3</ECheckbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkboxValue = ref(false);
const onchange = (value: boolean) => {
  // console.log(value);
};
const checkboxValue2 = ref('');
</script>
