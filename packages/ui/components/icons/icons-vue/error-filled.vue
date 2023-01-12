<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" :class="cls" :style="innerStyle"><path fill="none" d="M9 10.555 10.555 9 23 21.444 21.444 23z" /><path fill="currentColor" d="M16 2A13.914 13.914 0 0 0 2 16a13.914 13.914 0 0 0 14 14 13.914 13.914 0 0 0 14-14A13.914 13.914 0 0 0 16 2Zm5.445 21L9 10.556 10.556 9 23 21.445Z" /></svg>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue';
import { defineComponent, computed } from 'vue';
import { getPrefixCls } from '../../_utils/global-config';
import { isNumber } from '../../_utils/is';

export default defineComponent({
  name: 'ErrorFilled',
  props: {
    size: {
      type: [Number, String],
    },
    rotate: Number,
    spin: Boolean
  },
  setup(props) {
    const prefixCls = getPrefixCls('icon');
    const cls = computed(() => [prefixCls, `${prefixCls}-error-filled`, { [`${prefixCls}-spin`]: props.spin }]);
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
