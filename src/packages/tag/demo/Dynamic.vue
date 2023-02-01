<template>
    <e-tag
      v-for="(item, index) in list"
      :key="item"
      :closable="true"
      @close="closeClick(index)"
    >{{ item }}
    </e-tag
    >
    <e-input v-model="newTag" size="small" @keyup.enter="handleInputConfirm"/>
</template>
<script lang="ts" setup>
import {ref} from 'vue';

const list = ref(['标签一', '标签二', '标签三']);
const newTag = ref();
const closeClick = (index: number) => {
  list.value.splice(index, 1);
};
const handleInputConfirm = () => {
  if (newTag.value) {
    list.value.push(newTag.value);
    newTag.value = '';
  }
};
</script>
