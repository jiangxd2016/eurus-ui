<template>
  <ERadio v-model="checkValue" label="radio" value="1" @change="onChange" />
  <ERadio v-model="checkValue" label="radio" value="1" disabled @change="onChange" />
  <ERadio v-model="checkValue" label="radio" value="3" @change="onChange" />
  <ERadio v-model="checkValue" label="radio" :value="3" @change="onChange" />
  <ERadio v-model="checkValue2" label="true" :value="true" @change="onChange" />
  <ERadio v-model="checkValue2" label="false" :value="false" @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkValue = ref(3);
const checkValue2 = ref(true);
const onChange = (value: boolean) => {
  // console.log(value);
};
</script>