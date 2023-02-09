<template>
  <ESelectDown v-model="val" :clear="true" placeholder="test----------1" multiple>
    <p>基础用法</p>
    <p>基础用法</p>
    <p>基础用法</p>
    <p>基础用法</p>
    <p>基础用法</p>
  </ESelectDown>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const val = ref(['1', '2', '3']);
</script>
