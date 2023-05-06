<template>
  <EInput v-model="inputValue1">
    <template #prefix>
      prefix
    </template>
  </EInput>
  <EInput v-model="inputValue1">
    <template #suffix>
      <div>
        suffix
      </div>
    </template>
  </EInput>

  <EInput v-model="inputValue1">
    <template #prefix>
      prefix
    </template>
    <template #suffix>
      suffix
    </template>
  </EInput>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputValue1 = ref('fucking crazy Thursday');
</script>
