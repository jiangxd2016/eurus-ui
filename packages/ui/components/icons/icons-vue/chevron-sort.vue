<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" :class="cls" :style="innerStyle"><path fill="currentColor" d="m16 28-7-7 1.41-1.41L16 25.17l5.59-5.58L23 21l-7 7zm0-24 7 7-1.41 1.41L16 6.83l-5.59 5.58L9 11l7-7z" /></svg>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue';
import { defineComponent, computed } from 'vue';
import { getPrefixCls } from '../../_utils/global-config';
import { isNumber } from '../../_utils/is';

export default defineComponent({
  name: 'ChevronSort',
  props: {
    size: {
      type: [Number, String],
    },
    rotate: Number,
    spin: Boolean
  },
  setup(props) {
    const prefixCls = getPrefixCls('icon');
    const cls = computed(() => [prefixCls, `${prefixCls}-chevron-sort`, { [`${prefixCls}-spin`]: props.spin }]);
    const innerStyle = computed(() => {
      const styles: CSSProperties = {};
      if (props?.size) {
        styles.fontSize = isNumber(props.size) ? `${props.size}px` : props.size;
      }
      if (props.rotate) {
        styles.transform = `rotate(${props.rotate}deg)`;
      }
      return styles;
    });

    return {
      cls,
      innerStyle
    };
  }
});
</script>
