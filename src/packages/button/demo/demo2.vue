<template>
  <EButton type="primary" :loading="true" size="sx" :native-props="{ type: 'submit' }">123</EButton>
  <EButton type="primary" :loading="true" size="sm">123</EButton>
  <EButton type="primary" :loading="true" size="md">123</EButton>
  <EButton type="primary" :loading="true" size="lg">123</EButton>
  <EButton type="primary" :loading="true" size="xl">123</EButton>
</template>
<script lang="ts">
import { EButton } from 'eurus-ui'
export default {
  name: 'ButtonDemo',
  title: 'size',
  describe: '基本用法',
}
</script>
