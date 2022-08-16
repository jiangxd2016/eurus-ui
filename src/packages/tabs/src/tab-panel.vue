<template>
  <div
    ref="tabPanelRef" class="ra-tab-panel" :class="panelClass" @click="tabPanelClick"
    @mouseover="!raDisabled && (isHover = true)" @mouseleave="!raDisabled && (isHover = false)"
  >
    <div ref="tabWrapRef" :class="wrapClass">
      {{ raLabel }}
      <transition name="ra-tab-transform">
        <i v-show="isCollpaseShow" :class="closeIconClass" @click.stop="closeIconClick" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  ref,
  computed,
  onUnmounted,
} from 'vue';
import type { ITabsProvide } from './type';
import { TABS_PROVIDE_TOKEN } from './type';

export default defineComponent({
  name: 'RaTabPanel',
  props: {
    raLabel: {
      type: String,
      default: '',
    },
    raDisabled: {
      type: Boolean,
      default: false,
    },
    raName: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    const tabIndex = ref(0);
    const tabWrapRef = ref<HTMLElement>();
    const tabPanelRef = ref<HTMLElement>();
    const tabPanelProvide = inject<ITabsProvide>(TABS_PROVIDE_TOKEN);
    const isHover = ref(false);
    const isCurrentIndex = computed(() => {
      return tabIndex.value === tabPanelProvide.currentTabIndex.value;
    });
    const isCollpaseShow = computed(() => {
      if (tabPanelProvide.isCloseable.value) {
        if (!tabPanelProvide.tabType.value) { return true; }
        return isHover.value || isCurrentIndex.value;
      } else {
        return tabPanelProvide.isCloseable.value;
      }
    });

    // class
    const panelClass = computed(() => {
      const ret = [];
      tabPanelProvide.tabType.value
        && ret.push(`is-${tabPanelProvide.tabType.value}`);
      isCurrentIndex.value && ret.push('is-active');
      props.raDisabled && ret.push('is-disabled');
      return ret;
    });

    const wrapClass = computed(() => {
      const ret = ['ra-tab-panel__wrap'];
      props.raDisabled && ret.push('is-disabled');
      return ret;
    });

    const closeIconClass = computed(() => {
      const ret = ['ra-icon-close'];
      props.raDisabled && ret.push('is-disabled');
      return ret;
    });

    // funcs
    function setThePanelIndex(index: number) {
      tabIndex.value = index;
    }

    // lifecycle
    onMounted(() => {
      tabPanelProvide.tabPanelItems.push({
        tabPanelRef: tabPanelRef.value,
        tabWrapRef: tabWrapRef.value,
        name: props.raName,
        index: tabIndex.value,
        contentSlots: slots,
        setTabPanelIndex: setThePanelIndex,
      });
    });

    onUnmounted(() => {
      tabPanelProvide.tabPanelItems.splice(tabIndex.value, 1);
    });

    // methods
    const tabPanelClick = () => {
      if (props.raDisabled) { return; }
      tabPanelProvide.currentTabIndex.value = tabIndex.value;
      tabPanelProvide.tabClick(props.raName || tabIndex.value);
    };

    const closeIconClick = () => {
      tabPanelProvide.tabRemove(props.raName || tabIndex.value);
    };

    return {
      props,
      isHover,
      tabWrapRef,
      tabPanelRef,
      panelClass,
      wrapClass,
      closeIconClass,
      tabPanelClick,
      closeIconClick,
      isCollpaseShow,
    };
  },
});
</script>
