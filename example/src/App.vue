<template>
  <main v-loading="loading" font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <router-view />
    <Footer />
  </main>
</template>

<script setup lang="ts">
const loading = $ref(true);
</script>
