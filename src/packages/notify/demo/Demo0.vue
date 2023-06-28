<template>
  <ESpace>
    <EButton type="primary" @click="openMessage">Open message box</EButton>
    <EButton type="primary" @click="openCloseMessage">Open close message box</EButton>
    <EButton type="primary" @click="openCloseMessage">Open close message box</EButton>
  </ESpace>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const instance = getCurrentInstance();
const messageType = ['success', 'info', 'warning', 'error'];
const openMessage = () => {
  messageType.forEach((type) => {
    instance?.appContext.config.globalProperties.$notify[type]({
      title: 'notify',
      content: `This is a ${type} message`,
      duration: 0,
    });
  });
};

const openCloseMessage = () => {
  instance?.appContext.config.globalProperties.$notify.info({
    title: 'notify',
    content: 'This is a normal message',
    closable: true,
    duration: 0,
  });
};
</script>
