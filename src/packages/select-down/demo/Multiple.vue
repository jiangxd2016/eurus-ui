<template>
	<ESelectDown v-model="val" :clear="true" multiple>
		<p @click="updateSelected(1)">基础用法1</p>
		<p @click="updateSelected(2)">>基础用法1</p>
		<p @click="updateSelected(3)">>基础用法2</p>
		<p @click="updateSelected(4)">>基础用法3</p>
		<p @click="updateSelected(5)">>基础用法4</p>
	</ESelectDown>
	<ESelectDown v-model="val" :clear="true" size="xs" multiple>
		<p @click="updateSelected(1)">基础用法1</p>
		<p @click="updateSelected(2)">>基础用法1</p>
		<p @click="updateSelected(3)">>基础用法2</p>
		<p @click="updateSelected(4)">>基础用法3</p>
		<p @click="updateSelected(5)">>基础用法4</p>
	</ESelectDown>
	<ESelectDown v-model="val" :clear="true" size="sm" multiple>
		<p @click="updateSelected(1)">基础用法1</p>
		<p @click="updateSelected(2)">>基础用法1</p>
		<p @click="updateSelected(3)">>基础用法2</p>
		<p @click="updateSelected(4)">>基础用法3</p>
		<p @click="updateSelected(5)">>基础用法4</p>
	</ESelectDown>
	<ESelectDown v-model="val" :clear="true" size="lg" multiple>
		<p @click="updateSelected(1)">基础用法1</p>
		<p @click="updateSelected(2)">>基础用法1</p>
		<p @click="updateSelected(3)">>基础用法2</p>
		<p @click="updateSelected(4)">>基础用法3</p>
		<p @click="updateSelected(5)">>基础用法4</p>
	</ESelectDown>
	<ESelectDown v-model="val" :clear="true" size="xl" multiple>
		<p @click="updateSelected(1)">基础用法1</p>
		<p @click="updateSelected(2)">>基础用法1</p>
		<p @click="updateSelected(3)">>基础用法2</p>
		<p @click="updateSelected(4)">>基础用法3</p>
		<p @click="updateSelected(5)">>基础用法4</p>
	</ESelectDown>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const val = ref(['1', '2', '3']);

const updateSelected = (v: any) => {
	if (!val.value.includes(v)) {
		val.value.push(v + '');
	}
};
</script>
