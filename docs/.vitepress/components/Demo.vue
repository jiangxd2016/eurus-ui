<script setup>
import { ref } from 'vue';

const showCode = ref(false);
</script>

<template>
	<div class="">
		<slot />

		<div class="b-1px b-#ccc b-rd-8px">
			<div class="vp-raw flex flex-wrap items-end space-x-3 space-y-3 p-x-2 p-y-3">
				<slot name="demo" />
			</div>

			<div
				class="flex b-#ccc items-center justify-end mt-2 text-gray-600 b-t-1 p-y-2 p-x-4 dark:text-gray-600"
				:class="{ '!text-primary': showCode }"
			>
				<div class="i-carbon-code cursor-pointer" @click="showCode = !showCode" />
			</div>

			<div v-show="showCode">
				<slot name="code" />
			</div>
		</div>
	</div>
</template>

<style>
.vp-docs {
	margin: 0 !important;
}
</style>
