<template>
  <ESpace>
    <div v-for="(icon, index) in AllIconKeys" :key="index">
      <EIcon :name="icon" />
      <span>{{ icon }}</span>
    </div>
  </ESpace>
</template>

<script lang="ts" setup>
import * as AllIcon from 'eurus-icons-vue';

const AllIconKeys = Object.keys(AllIcon);
</script>
