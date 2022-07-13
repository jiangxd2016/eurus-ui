<template>
  <ELoading v-model="show" loadding-text="加载中..." />

  <ELoading v-model="show" loadding-text="请等待..." />

  <ELoading v-model="bodyShow" to="body" loadding-text="to body loading" />

  <EButton :disabled="bodyShow" @click="toBodyLoading">to body loading</EButton>
</template>

<script setup>
import { ELoading, EButton } from 'eurus-ui';

import { ref } from 'vue';
const show = ref(false);
const bodyShow = ref(false);

const toBodyLoading = () => {
  bodyShow.value = true;

  setTimeout(() => {
    bodyShow.value = false;
  }, 5000);
};
</script>
