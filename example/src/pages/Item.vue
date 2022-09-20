<template>
  <div class="item-inner">
    <span># {{ source.index }}</span>
    <span>{{ source.name }}</span>

    <div v-if="source.desc">{{ source.desc }}</div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

withDefaults(
  defineProps<{
    source: any;

  }>(),
  {
    source: {

    }
  }
);
</script>

<style  scoped>
.item {
  display: flex;
}

.item .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 192, 203, 0.2);
}

@media (max-width: 640px) {
  .item .avatar {
    width: 30px;
    height: 30px;
  }
}

.item .avatar img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.item .body {
  flex: 1;
  padding-left: 1em;
  font-size: 16px;
  max-width: 560px;
  word-break: break-word;
}

@media (max-width: 640px) {
  .item .body {
    font-size: 14px;
    max-width: unset;
  }
}

.item .body .name {
  padding-bottom: .2em;
  font-size: 12px;
}

.item .body .content {
  position: relative;
  color: #000;
  background-color: aliceblue;
  border-radius: 15px;
  padding: .5em 1em;
}

@media (max-width: 640px) {
  .item .body .content {
    padding: .5em;
  }
}

.item .body .content:after {
  content: '';
  position: absolute;
  right: 100%;
  top: 10px;
  width: 14px;
  height: 14px;
  border-width: 0;
  border-style: solid;
  border-color: transparent;
  border-bottom-width: 10px;
  border-bottom-color: currentColor;
  border-radius: 0 0 0 32px;
  color: aliceblue;
}

.item.creator {
  transform: rotateX(180deg);
  direction: rtl;
  align-items: flex-end;
}

.item.creator .avatar {
  transform: rotateX(180deg);
}

.item.creator .body {
  transform: rotate(180deg);
}

.item.creator .text {
  transform: rotateY(180deg);
  direction: ltr;
}
</style>
