<template>
  <div class="demo0">
    <EButton type="primary" @click="openMessage">Open the message box</EButton>
  </div>
</template>

<script setup  lang="ts">
import { getCurrentInstance, onMounted } from 'vue';
const instance = getCurrentInstance();

onMounted(() => {
  console.log(instance);
});
const openMessage = () => {
  instance?.appContext.config.globalProperties.$message.info({
    content: 'This is a normal message',
    duration: 0,
  });
};
</script>
