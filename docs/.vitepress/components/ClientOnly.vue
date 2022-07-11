<template>
  <component
    :is="dynamicComponent"
    v-if="dynamicComponent"
  />
</template>

<script lang="ts" setup>
import { onMounted, shallowRef } from 'vue';

const dynamicComponent = shallowRef<any>(null);
onMounted(()=>{
  import('./CodeDemo.vue').then((module) => {

    dynamicComponent.value = module.default;
  });
});
</script>
