<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" :class="cls" :style="innerStyle"><path fill="currentColor" d="M9 10.555 10.555 9 23 21.444 21.444 23z" /><path fill="currentColor" d="M16 2A13.914 13.914 0 0 0 2 16a13.914 13.914 0 0 0 14 14 13.914 13.914 0 0 0 14-14A13.914 13.914 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12 12.035 12.035 0 0 1-12 12Z" /></svg>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue';
import { defineComponent, computed } from 'vue';
import { getPrefixCls } from '../../_utils/global-config';
import { isNumber } from '../../_utils/is';

export default defineComponent({
  name: 'ErrorOutline',
  props: {
    size: {
      type: [Number, String],
    },
    rotate: Number,
    spin: Boolean
  },
  setup(props) {
    const prefixCls = getPrefixCls('icon');
    const cls = computed(() => [prefixCls, `${prefixCls}-error-outline`, { [`${prefixCls}-spin`]: props.spin }]);
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
