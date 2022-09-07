import type {
  PropType,
  Ref } from 'vue';
import {
  defineComponent,

  onMounted,
  provide,
  ref,
  nextTick,
  watch,
  reactive,
  vShow,
  onUnmounted,
} from 'vue';
import Icon from '../../icons';

import RaTabBar from './tab-bar';
import type {
  TTabPosition,
  TTabsType,
  ITabsProvide,
  TTabPanel
} from './type';
import {
  TABS_PROVIDE_TOKEN,
  TAB_UPDATE_EVENT
} from './type';

import './tabs.scss';

const ETabsProps = {
  modelValue: {
    type: String,
    default: '',
  },
  raType: {
    type: String as PropType<TTabsType>,
    default: '',
  },
  raCloseable: {
    type: Boolean,
    default: false,
  },
  raTabPosition: {
    type: String as PropType<TTabPosition>,
    default: 'top',
  },
};
export default defineComponent({
  name: 'ETabs',
  components: { RaTabBar },
  props: ETabsProps,
  emits: ['eu-tab-click', 'eu-tab-remove', TAB_UPDATE_EVENT],
  setup(props, { emit, slots }) {
    const currentWidth = ref<number>(0);
    const currentPosition = ref<number>(0);
    const currentTabIndex = ref<number>(0);
    const contentSlot = ref();
    const scrollRef = ref<HTMLElement>() as unknown as Ref<HTMLElement>;
    const isArrowShow = ref(false);
    const tabPanelItems = reactive<TTabPanel[]>([]) as unknown as TTabPanel[];

    const tabRemove = (delValue: number | string) => {
      emit('eu-tab-remove', delValue);
    };
    const tabClick = (clickValue: number | string) => {
      let tabPanelTarget: typeof tabPanelItems[0];
      emit('eu-tab-click', clickValue);
      if (typeof clickValue === 'number') {
        tabPanelTarget = tabPanelItems[clickValue];
      } else if (typeof clickValue === 'string') {
        tabPanelTarget = tabPanelItems.find(_ => _.name === clickValue) as TTabPanel;
      }

      const panelReact = tabPanelTarget!.tabPanelRef.getBoundingClientRect();
      const scrollReact = scrollRef.value.getBoundingClientRect();

      if (
        panelReact.x - scrollReact.x
        < tabPanelTarget!.tabPanelRef.offsetWidth
      ) {
        scrollRef.value.scroll({
          left: tabPanelTarget!.tabPanelRef.offsetLeft,
          top: 0,
          behavior: 'smooth',
        });
      } else if (
        scrollReact.x + scrollReact.width - panelReact.x < tabPanelTarget!.tabPanelRef.offsetWidth
      ) {
        scrollRef.value.scroll({
          left:
            scrollReact.x
            + scrollRef.value.offsetWidth
            - tabPanelTarget!.tabPanelRef.clientWidth,
          top: 0,
          behavior: 'smooth',
        });
      }
    };

    const provideConfig = {
      tabClick,
      tabRemove,
      contentSlot,
      currentWidth,
      tabPanelItems,
      currentTabIndex,
      currentPosition,
      tabType: ref(props.raType),
      isCloseable: ref(props.raCloseable),
    };

    const setTheArrow = () =>{
      if (scrollRef.value.scrollWidth > scrollRef.value.clientWidth) {
        isArrowShow.value = true;
        scrollRef.value.scrollLeft = scrollRef.value.scrollWidth;
      } else {
        isArrowShow.value = false;
      }
    };
    const handleArrowClick = (direction: 'left' | 'right')=> {
      const scrollOffset
        = direction === 'left'
          ? scrollRef.value.scrollLeft - scrollRef.value.offsetWidth
          : scrollRef.value.scrollLeft + scrollRef.value.offsetWidth;

      scrollRef.value.scroll({
        left: scrollOffset,
        top: 0,
        behavior: 'smooth',
      });
    };

    const ro = new ResizeObserver(setTheArrow);

    const updateTheTabBar = ()=> {
      if (tabPanelItems.length > 0) {
        const currentPanel = tabPanelItems[currentTabIndex.value];
        if (!currentPanel) { return; }
        provideConfig.currentWidth.value = currentPanel.tabWrapRef.offsetWidth;
        provideConfig.currentPosition.value = currentPanel.tabWrapRef.offsetLeft;
      }
    };

    const setTabIndex = ()=> {
      tabPanelItems.forEach((tab, index) => {
        if (tab.name === props.modelValue) {
          currentTabIndex.value = index;
        }
        tab.setTabPanelIndex(index);
      });
    };

    // lifecycle
    onMounted(async () => {
      await nextTick();
      setTabIndex();
      updateTheTabBar();
      ro.observe(scrollRef.value);
    });

    onUnmounted(() => {
      ro.disconnect();
    });

    watch(currentTabIndex, () => {
      emit(
        TAB_UPDATE_EVENT,
        tabPanelItems[currentTabIndex.value].name
        || tabPanelItems[currentTabIndex.value].index,
      );
      updateTheTabBar();
    });

    watch(tabPanelItems, () => {
      if (tabPanelItems.length === 1) {
        currentTabIndex.value = 0;
      }
      setTabIndex();
      updateTheTabBar();
      setTheArrow();
    });

    provide<ITabsProvide>(TABS_PROVIDE_TOKEN, provideConfig);
    const isType = props.raType && `is-${props.raType}`;

    return () => (
      <div class='eu-tabs'>
        <div class={['eu-tabs__wrap', isType]} >
          <div class='eu-tabs__scroll' ref={scrollRef}>
            <div class={['eu-tabs__nav', isType, isArrowShow.value && 'is-scroll']}>
              {slots?.default && slots.default()}
            </div>
            <Icon name="arrowRight" onClick={ ()=> handleArrowClick('right')}>{[vShow, isArrowShow.value]}</Icon>
          </div>
          {props.raType ? null : <RaTabBar />}
        </div>
        <div class={['eu-tabs__content', isType]} >
          { tabPanelItems.map((tab, index) => {
            return <div style={`display:${currentTabIndex.value === index ? 'unset' : 'none'}`}>
              {tab.contentSlots.default ? tab.contentSlots.default() : null}
            </div>;

          })}
        </div>
      </div>
    );
  }
});
