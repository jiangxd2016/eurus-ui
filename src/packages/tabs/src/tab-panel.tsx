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
  name: 'ETabPanel',
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
    const tabPanelProvide = inject<ITabsProvide>(TABS_PROVIDE_TOKEN) as ITabsProvide;
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
      const ret = ['eu-tab-panel__wrap'];
      props.raDisabled && ret.push('is-disabled');
      return ret;
    });

    const closeIconClass = computed(() => {
      const ret = ['eu-icon-close'];
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
        tabPanelRef: tabPanelRef.value!,
        tabWrapRef: tabWrapRef.value!,
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

    return ()=>(
      <div
      ref={tabPanelRef} class={[panelClass, 'eu-tab-panel']} onClick={tabPanelClick}
      onMouseover={()=>{ !props.raDisabled && (isHover.value = true); }} on-mouseleave={()=>!props.raDisabled && (isHover.value = false)}
    >
      <div ref="tabWrapRef" class={wrapClass}>
        { props.raLabel }
        {
          isCollpaseShow.value && <transition name="eu-tab-transform">
          <i class={closeIconClass} on-click={closeIconClick} />
        </transition>
        }
      </div>
    </div>
    );

  },
});
