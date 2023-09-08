<template>
	<ESelect v-model="vals" size="xs">
		<EOption value="1" label="基础用法1">基础用法1</EOption>
		<EOption value="2" label="基础用法2">基础用法2</EOption>
		<EOption value="3" label="基础用法3">基础用法3</EOption>
		<EOption value="4" disabled label="基础用法4">基础用法4</EOption>
		<EOption value="5" label="基础用法5">基础用法5</EOption>
	</ESelect>
	<ESelect v-model="vals" size="sm">
		<EOption value="1" label="基础用法1">基础用法1</EOption>
		<EOption value="2" label="基础用法2">基础用法2</EOption>
		<EOption value="3" label="基础用法3">基础用法3</EOption>
		<EOption value="4" disabled label="基础用法4">基础用法4</EOption>
		<EOption value="5" label="基础用法5">基础用法5</EOption>
	</ESelect>
	<ESelect v-model="vals" size="md">
		<EOption value="1" label="基础用法1">基础用法1</EOption>
		<EOption value="2" label="基础用法2">基础用法2</EOption>
		<EOption value="3" label="基础用法3">基础用法3</EOption>
		<EOption value="4" disabled label="基础用法4">基础用法4</EOption>
		<EOption value="5" label="基础用法5">基础用法5</EOption>
	</ESelect>
	<ESelect v-model="vals" size="lg">
		<EOption value="1" label="基础用法1">基础用法1</EOption>
		<EOption value="2" label="基础用法2">基础用法2</EOption>
		<EOption value="3" label="基础用法3">基础用法3</EOption>
		<EOption value="4" disabled label="基础用法4">基础用法4</EOption>
		<EOption value="5" label="基础用法5">基础用法5</EOption>
	</ESelect>
	<ESelect v-model="vals" size="xl">
		<EOption value="1" label="基础用法1">基础用法1</EOption>
		<EOption value="2" label="基础用法2">基础用法2</EOption>
		<EOption value="3" label="基础用法3">基础用法3</EOption>
		<EOption value="4" disabled label="基础用法4">基础用法4</EOption>
		<EOption value="5" label="基础用法5">基础用法5</EOption>
	</ESelect>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const vals = ref('1');

setTimeout(() => {
	vals.value = '2';
}, 2000);
</script>
