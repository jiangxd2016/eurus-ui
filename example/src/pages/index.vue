<template>
  <div>
    <e-virtual-list
      ref="vsl" style=" height: 300px; overflow:auto;" class="list-page scroll-touch"
      data-key="id" :data-sources="items" :data-component="Item" :estimate-size="135" item-class="list-item-page"
      :page-mode="true"
    />
  </div>
</template>

<script lang="ts" setup>
import getRandomData from '../composables/useData';

import Item from './item';

const items = getRandomData();
</script>

