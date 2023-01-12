<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" :class="cls" :style="innerStyle"><path fill="currentColor" d="m6 18 1.41 1.41L15 11.83V30h2V11.83l7.59 7.58L26 18 16 8 6 18zM6 8V4h20v4h2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4z" /></svg>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue';
import { defineComponent, computed } from 'vue';
import { getPrefixCls } from '../../_utils/global-config';
import { isNumber } from '../../_utils/is';

export default defineComponent({
  name: 'Upload',
  props: {
    size: {
      type: [Number, String],
    },
    rotate: Number,
    spin: Boolean
  },
  setup(props) {
    const prefixCls = getPrefixCls('icon');
    const cls = computed(() => [prefixCls, `${prefixCls}-upload`, { [`${prefixCls}-spin`]: props.spin }]);
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
