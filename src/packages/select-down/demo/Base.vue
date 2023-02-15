<template>
  <ESelectDown v-model="val" :clear="true" placeholder="test----------1test----------1test----------1test----------1test----------1test----------1test----------1test----------1test----------1test----------1test----------1test----------1test----------1test----------1test----------1test----------1">
    <p @click="updateSelected(1)">基础用法1</p>
    <p @click="updateSelected(2)">>基础用法1</p>
    <p @click="updateSelected(3)">>基础用法2</p>
    <p @click="updateSelected(4)">>基础用法3</p>
    <p @click="updateSelected(5)">>基础用法4</p>
  </ESelectDown>
  <ESelectDown v-model="val" :clear="true" size="xs" placeholder="test----------1">
    <p @click="updateSelected(1)">基础用法1</p>
    <p @click="updateSelected(2)">>基础用法1</p>
    <p @click="updateSelected(3)">>基础用法2</p>
    <p @click="updateSelected(4)">>基础用法3</p>
    <p @click="updateSelected(5)">>基础用法4</p>
  </ESelectDown>
  <ESelectDown v-model="val" :clear="true" size="sm" placeholder="test----------1">
    <p @click="updateSelected(1)">基础用法1</p>
    <p @click="updateSelected(2)">>基础用法1</p>
    <p @click="updateSelected(3)">>基础用法2</p>
    <p @click="updateSelected(4)">>基础用法3</p>
    <p @click="updateSelected(5)">>基础用法4</p>
  </ESelectDown>
  <ESelectDown v-model="val" :clear="true" size="lg" placeholder="test----------1">
    <p @click="updateSelected(1)">基础用法1</p>
    <p @click="updateSelected(2)">>基础用法1</p>
    <p @click="updateSelected(3)">>基础用法2</p>
    <p @click="updateSelected(4)">>基础用法3</p>
    <p @click="updateSelected(5)">>基础用法4</p>
  </ESelectDown>
  <ESelectDown v-model="val" :clear="true" size="xl" placeholder="test----------1">
    <p @click="updateSelected(1)">基础用法1</p>
    <p @click="updateSelected(2)">>基础用法1</p>
    <p @click="updateSelected(3)">>基础用法2</p>
    <p @click="updateSelected(4)">>基础用法3</p>
    <p @click="updateSelected(5)">>基础用法4</p>
  </ESelectDown>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const val = ref('1');

const updateSelected = (v: any) => {
  val.value = v + '';
  console.log(val.value);
};
</script>

