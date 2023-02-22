<template>
  <EDatePicker @change="handleChange" />

  <EDatePicker @change="handleChange"  type="month"/>
</template>

<script setup lang="ts">
const handleChange = (value: string) => {
  // console.log(value);
};
</script>
