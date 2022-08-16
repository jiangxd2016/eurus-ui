<template>
  <div class="ra-tab-bar" :style="barStyle" />
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';
import type { ITabsProvide } from './type';
import { TABS_PROVIDE_TOKEN } from './type';
export default defineComponent({
  setup() {
    const tabProvide = inject<ITabsProvide>(TABS_PROVIDE_TOKEN);
    const barStyle = computed(() => {
      const ret = [];
      ret.push({ left: tabProvide.currentPosition.value + 'px' }, { width: tabProvide.currentWidth.value + 'px' });
      return ret;
    });

    return {
      barStyle,
    };
  },
});
</script>
