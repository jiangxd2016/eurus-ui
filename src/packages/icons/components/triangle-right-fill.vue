<template>
  <svg viewBox="0 0 256 256" :class="cls" :style="innerStyle"><path fill="currentColor" d="m181.7 133.7-80 80A8.3 8.3 0 0 1 96 216a8.5 8.5 0 0 1-3.1-.6A8 8 0 0 1 88 208V48a8 8 0 0 1 4.9-7.4 8.4 8.4 0 0 1 8.8 1.7l80 80a8.1 8.1 0 0 1 0 11.4Z" /></svg>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue';
import { defineComponent, computed } from 'vue';
import { getPrefixCls } from '../../_utils/global-config';
import { isNumber } from '../../_utils/is';

export default defineComponent({
  name: 'TriangleRightFill',
  props: {
    size: {
      type: [Number, String],
    },
    rotate: Number,
    spin: Boolean
  },
  setup(props) {
    const prefixCls = getPrefixCls('icon');
    const cls = computed(() => [prefixCls, `${prefixCls}-triangle-right-fill`, { [`${prefixCls}-spin`]: props.spin }]);
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
