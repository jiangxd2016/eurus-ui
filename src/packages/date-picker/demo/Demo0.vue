<template>
  <EDatePicker @change="handleChange" />
</template>

<script setup lang="ts">
const handleChange = (value: string) => {
  console.log(value);
};
</script>
