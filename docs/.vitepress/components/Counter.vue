<template>
  <div class="counter">
    <div>Counter: {{ counter }}</div>
    <button @click="counter += 1">
      Inc
    </button>
    <button @click="counter -= 1">
      Dec
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, inject, defineAsyncComponent } from 'vue'

const props = defineProps<{ src?: string }>() 

const glob: any[] = inject('glob')

console.log(glob);

for (const path in glob) {
  console.log(path, glob[path]);
}
const counter = ref( 0)
</script>

<style scoped>
.counter {
  border: 2px dashed #3eaf7c;
  padding: 5px 10px 10px 10px;
}
</style>
