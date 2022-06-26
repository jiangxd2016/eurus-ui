<template>
  <component
    :is="dynamicComponent"
    v-if="dynamicComponent"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const dynamicComponent = ref<any>(null);
onMounted(()=>{
  import('./CodeDemo.vue').then((module) => {
    dynamicComponent.value = module.default;
  });
});
</script>
