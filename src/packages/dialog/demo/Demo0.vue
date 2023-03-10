<template>
  <ESpace>
    <EButton @click="openDialog">open dialog</EButton>
    <EButton @click="show2 = true">open dialog</EButton>
  </ESpace>
  <EDialog v-model:visible="visible" title="标题" width="80%" draggable @close="visible = false">
    <template #default>
      <div class="dialog-content">
        <p>内容</p>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <EButton type="primary">确定</EButton>
      </div>
    </template>
  </EDialog>

  <EDialog v-model:visible="show2" title="标题2" width="80%" @close="show2 = false">
    <template #default>
      <div class="dialog-content">
        <p>内容</p>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <EButton type="primary" @click="visible = false">确定</EButton>
      </div>
    </template>
  </EDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const show2 = ref(false);
const openDialog = () => {
  visible.value = true;
  //
  // setTimeout(() => {
  //   show2.value = true;
  // }, 1000);
};
</script>
