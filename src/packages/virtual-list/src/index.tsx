import type {
  PropType
} from 'vue';
import {
  onUnmounted,
  renderSlot,
  ref,
  computed,
  onMounted,
  nextTick,
  defineComponent,
  reactive,
  watch,
  h
} from 'vue';
import { Accumulate, arrayLast, binarySearch, css, hasClass, notGreaterThan } from './utils';
import VirtualListTable from './VirtualListTable';

const EVirtualListProps = {
  items: Array as PropType<any[]>,
  disabled: Boolean,
  horizontal: Boolean,
  firstRender: { type: Number, default: 10 },
  buffer: { type: Number, default: 100 },
  itemKey: {
    type: [String, Function] as PropType<
      'index' | ((item: any, index: number) => any)
    >,
  },
  itemSize: {
    type: Function as PropType<
      (item: any, index: number) => number | null | undefined | void
    >,
  },
  table: Boolean,
};
export default defineComponent({
  name: 'EVirtualList',
  props: EVirtualListProps,
  setup(props, { slots, emit }) {
    const start = ref(0);
    const end = ref(props.firstRender - 1);
    const end2 = computed(() =>
      notGreaterThan(end.value, (props.items?.length || 1) - 1)
    );
    const avgSize = ref(0);
    const runtimeSizes = computed(() =>
      reactive<(number | null)[]>((props.items || []).map(() => null))
    );

    const sizes = computed(() =>
      (props.items || []).map((item, index) =>
        computed(() => {
          if (runtimeSizes.value[index] != null) {
            return runtimeSizes.value[index];
          }
          let r = props.itemSize?.(item, index);
          if (r == null) {
            r = avgSize.value;
          }
          return r;
        })
      )
    );
    const positions = computed(() =>
      (props.items || []).map((item, index) =>
        computed(() => {
          let r: number;
          if (index === 0) {
            r = 0;
          }

          const prevPosition = positions.value![index - 1] || ref(0);
          const prevSize = sizes.value![index - 1] || ref(0);
          r = prevPosition.value + prevSize.value!;

          return r;
        })
      )
    );
    function getPosition(index: number): number {
      return positions.value[index].value;
    }
    // not reactive
    const positionsAccumulate = ref<Accumulate<typeof sizes.value[0]>>();

    const startSize = computed(() => getPosition(start.value));
    const totalSize = computed(() =>
      positions.value.length > 0
        ? getPosition(positions.value.length - 1)
        + arrayLast(sizes.value).value!
        : 0
    );
    const endSize = computed(
      () =>
        totalSize.value
        - getPosition(end2.value)
        - sizes.value[end2.value].value!
    );
    const listStyle = computed(() =>
      !props.disabled ? { overflow: 'auto' } : {}
    );
    const listInnerStyle = computed(() => {
      const r: any = {
        display: 'flex',
      };
      if (!props.disabled) {
        if (!props.horizontal) {
          Object.assign(r, {
            'margin-top': startSize.value + 'px',
            'margin-bottom': endSize.value + 'px',
          });
        } else {
          Object.assign(r, {
            'margin-left': startSize.value + 'px',
            'margin-right': endSize.value + 'px',
            'width': totalSize.value - endSize.value - startSize.value + 'px',
          });
        }
      }
      r['flex-direction'] = !props.horizontal ? 'column' : 'row';
      if (props.table) {
        delete r.display;
        delete r['flex-direction'];
      }
      return r;
    });

    const resetPositionsAccumulate = () => {
      positionsAccumulate.value = new Accumulate(sizes.value);
      positionsAccumulate.value.getValue = item => item['value']!;
    };
    resetPositionsAccumulate();

    watch(() => props.items, update);
    watch(() => positions.value, resetPositionsAccumulate);
    const visibleItemsInfo = computed(() => {
      if (!props.items || props.disabled) {
        return;
      }
      const r: { item: typeof props.items[0]; index: number }[] = [];

      for (let index = start.value; index <= end2.value; index++) {
        const item = props.items[index];
        if (!item) {
          break;
        }
        r.push({ item, index });
      }
      return r;
    });
    const listElRef = ref<HTMLElement>();
    const listInnerRef = ref();
    onMounted(async () => {
      update();
      try {
        createResizeObserver();
      } catch {
        // ResizeObserver fallback
        await nextTick();
        update();
      }
    });

    let prevScroll: number;
    function onscroll() {
      const listEl = listElRef.value!;
      if (!listEl) {
        return;
      }
      const currentScroll = getScroll(listEl);
      if (
        prevScroll != null
        && props.buffer - Math.abs(currentScroll - prevScroll) >= 10
      ) {
        return;
      }
      prevScroll = currentScroll;
      update();
    }

    let executing = false;
    let waiting = false;
    async function update() {
      if (executing) {
        waiting = true;
        return;
      }
      if (!props.items || props.disabled) {
        return;
      }
      executing = true;
      const listEl = listElRef.value!;
      const listInner: HTMLElement = listInnerRef.value?.$el;
      if (!listEl || !listInner) {
        return;
      }

      if (!avgSize.value) {
        avgSize.value = getAvgSize();
      }
      start.value = getStart();
      end.value = getEnd();

      await nextTick();

      // updateRuntimeSize
      let updated;
      let vi0 = 0;
      const runtimeSizesTemp: Record<number, number> = {};
      const children: HTMLCollection = !props.table
        ? listInner.children
        : listInner.querySelector('tbody')!.children;
      for (const el of Array.from(children)) {
        const cssPosition = css(el, 'position');
        if (cssPosition && ['absolute', 'fixed'].includes(cssPosition)) {
          continue;
        }
        const size
          = css(el, 'display') !== 'none' ? getOuterSize(el) : 0;
        const vi = el.getAttribute('vt-index');
        const index = vi ? Number.parseInt(vi) : start.value + vi0;
        runtimeSizesTemp[index] = (runtimeSizesTemp[index] || 0) + size;
        vi0++;
      }
      for (const indexS of Object.keys(runtimeSizesTemp)) {
        const index = Number.parseInt(indexS);
        if (runtimeSizes.value[index] !== runtimeSizesTemp[index]) {
          runtimeSizes.value[index] = runtimeSizesTemp[index];
          updated = true;
        }
      }
      if (updated) {
        await nextTick();
      }
      // call wating task if existing
      executing = false;
      if (waiting) {
        waiting = false;
        update();
      }

      // functions
      function getStart() {
        const startPosition
          = getScroll(listEl) - getPaddingStart(listEl) - props.buffer;
        const r = binarySearch(
          positions.value,
          mid => mid.value - startPosition,
          { returnNearestIfNoHit: true }
        )!;
        return r.index;
      }
      function getEnd() {
        const endPosition
          = getScroll(listEl)
          - getPaddingStart(listEl)
          + getClientSize(listEl)
          + props.buffer;

        const r = binarySearch(
          positions.value,
          mid => mid.value - endPosition,
          { returnNearestIfNoHit: true }
        )!;
        return r.index;
      }
      function getAvgSize() {
        const maxSampleCount = 10;
        const sizeArr: number[] = [];
        const children = !props.table
          ? listInner.children
          : listInner.querySelector('tbody')!.children;
        for (const child of Array.from(children)) {
          const el = child;
          const style = getComputedStyle(el);
          if (['absolute', 'fixed'].includes(style.position)) {
            continue;
          }
          const outerSize = getOuterSize(el);
          sizeArr.push(outerSize);
          if (sizeArr.length >= maxSampleCount) {
            break;
          }
        }
        if (sizeArr.length === 0) {
          return 0;
        }
        return sizeArr.reduce((a, b) => a + b, 0) / sizeArr.length;
      }
    }
    function getClientSize(el: Element) {
      const style = getComputedStyle(el);
      let r = Number.parseFloat(!props.horizontal ? style.height : style.width);
      if (style.boxSizing === 'border-box') {
        if (!props.horizontal) {
          r
            = r
            - Number.parseFloat(style.borderTopWidth)
            - Number.parseFloat(style.borderBottomWidth);
        } else {
          r
            = r
            - Number.parseFloat(style.borderLeftWidth)
            - Number.parseFloat(style.borderRightWidth);
        }
      }
      return r;
    }
    function getOuterSize(el: Element) {
      let r = getClientSize(el);
      const style = getComputedStyle(el);
      if (!props.horizontal) {
        r
          += Number.parseFloat(style.borderTopWidth)
          + Number.parseFloat(style.borderBottomWidth)
          + Number.parseFloat(style.marginTop)
          + Number.parseFloat(style.marginBottom);
      } else {
        r
          += Number.parseFloat(style.borderLeftWidth)
          + Number.parseFloat(style.borderRightWidth)
          + Number.parseFloat(style.marginLeft)
          + Number.parseFloat(style.marginRight);
      }
      r = Number.isNaN(r) ? 0 : r;
      return r;
    }
    function getScroll(el: HTMLElement) {
      return !props.horizontal ? el.scrollTop : el.scrollLeft;
    }
    function getPaddingStart(el: HTMLElement) {
      const style = getComputedStyle(el);
      return !props.horizontal
        ? Number.parseFloat(style.paddingTop)
        : Number.parseFloat(style.paddingLeft);
    }
    // function getPaddingEnd(el: HTMLElement) {
    //   const style = getComputedStyle(el);
    //   return !props.horizontal
    //     ? parseFloat(style.paddingBottom)
    //     : parseFloat(style.paddingRight);
    // }

    function createResizeObserver() {
      const listEl = listElRef.value!;
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (hasClass(entry.target, 'vtlist')) {
            update();
            break;
          }
        }
      });
      resizeObserver.observe(listEl);
    }

    function getItemKey(item: any, index: number) {
      if (props.itemKey) {
        if (typeof props.itemKey === 'string' && props.itemKey === 'index') {
          return index;
        } else if (typeof props.itemKey === 'function') {
          return props.itemKey(item, index);
        }
      }
    }

    onMounted(() => {
      listElRef.value?.addEventListener('scroll', onscroll, { passive: true });
    });
    onUnmounted(() => {
      listElRef.value?.removeEventListener('scroll', onscroll);
    });
    return () => (
      <div class="vtlist" ref={listElRef} style={listStyle.value} >

        {h(VirtualListTable, {
          class: 'vtlist-inner',
          ref: listInnerRef,
          style: listInnerStyle.value,
          table: props.table,
        }, {
          prepend: () => [
            slots.prepend?.(),
          ],
          append: () => [
            slots.append?.(),
          ],
          default: () => {
            return ((props.disabled ? props.items : visibleItemsInfo.value) || []).map((item, index) => {
              return renderSlot(slots, 'default', {
                key: getItemKey(item, index),
                item,
                index
              });
            });
          }
        })}

      </div>

    );
  },
});
