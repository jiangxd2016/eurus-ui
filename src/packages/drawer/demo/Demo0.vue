<template>
  <EButton @click="open">Open Drawer</EButton>
  <EDrawer :visible="visible" title="喝前摇一摇" :footer="true" @close="open">
    喝前摇一摇 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪
    汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 汪汪汪汪汪汪 s
  </EDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

const open = () => {
  visible.value = !visible.value;
};
</script>
