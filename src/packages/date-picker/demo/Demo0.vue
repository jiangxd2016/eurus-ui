<template>
  <EDatePicker @change="handleChange" />

  <EDatePicker type="month" @change="handleChange" />
  <EDatePicker type="range" @change="handleChange" />
</template>

<script setup lang="ts">
const handleChange = (value: string) => {
  // console.log(value);
};
</script>
