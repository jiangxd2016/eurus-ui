<template>
  <li>
    <span v-if="page === null" class="DotsHolder">
      <Icon class="Dots" name="doubleDot" />
    </span>
    <button
      v-else class="Page" type="button" :aria-label="`Go to page ${page}`" :class="{ 'Page-active': isActive }"
      :style="{ backgroundColor: isActive ? activeColor : 'transparent' }" @click="clickHandler"
    >
      {{ page }}
    </button>
  </li>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import Icon from '../../icons';
export default defineComponent({
  name: 'VPage',
  components: { Icon },
  props: {
    page: {
      type: Number as PropType<number>,
      default: null,
    },
    current: {
      type: Number,
      default: 0,
    },
    activeColor: {
      type: String,
      default: '#DCEDFF',
    },
  },
  emits: ['update'],

  setup(props, { emit }) {
    const isActive = computed(() => {
      return props.page === props.current;
    });

    function clickHandler() {
      emit('update', props.page);
    }

    return { isActive, clickHandler };
  },
});
</script>

