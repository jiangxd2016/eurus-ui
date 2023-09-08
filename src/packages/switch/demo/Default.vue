<template>
	<ESwitch v-model="switchValue" @change="onChange" />
	<ESwitch v-model="switchValue" disabled @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const switchValue = ref(false);
const onChange = (value: boolean) => {
	// console.log(value);
};
</script>
