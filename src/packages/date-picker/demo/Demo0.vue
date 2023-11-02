<template>
	<EDatePicker v-model="val" @change="handleChange" />

	<EDatePicker v-model="val" type="month" @change="handleChange" />
	<EDatePicker type="range" @change="handleChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const val = ref('2023.03.10');
const handleChange = (value: string) => {
	// console.log(value);
};
</script>
