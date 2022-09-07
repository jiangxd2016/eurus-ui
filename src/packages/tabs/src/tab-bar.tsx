import { defineComponent, inject, computed } from 'vue';
import type { ITabsProvide } from './type';
import { TABS_PROVIDE_TOKEN } from './type';
export default defineComponent({
  setup() {
    const tabProvide = inject<ITabsProvide>(TABS_PROVIDE_TOKEN);
    const barStyle = computed(() => {
      return [{ left: tabProvide?.currentPosition.value ?? 0 + 'px' }, { width: tabProvide?.currentWidth.value ?? 0 + 'px' }];
    });
    return ()=><div class="eu-tab-bar" style={barStyle.value} />;

  },
});
