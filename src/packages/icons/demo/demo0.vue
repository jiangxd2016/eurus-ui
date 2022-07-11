<template>
  <div class="wrapper">
    <div class="item">
      <EIcon name="arrowDown" size="40" color="#df8d39" />
      <p>arrowDown</p>
    </div>

    <div class="item">
      <EIcon name="arrowLeft" size="40" color="#29684a" />
      <p>arrowLeft</p>
    </div>

    <div class="item">
      <EIcon name="arrowRight" size="40" color="#907a7a" />
      <p>arrowRight</p>
    </div>

    <div class="item">
      <EIcon name="arrowUp" size="40" color="#9abbe5" />
      <p>arrowUp</p>
    </div>

    <div class="item">
      <EIcon name="caretDown" size="40" color="#eda62c" />
      <p>caretDown</p>
    </div>

    <div class="item">
      <EIcon name="caretLeft" size="40" color="#41da44" />
      <p>caretLeft</p>
    </div>

    <div class="item">
      <EIcon name="caretRight" size="40" color="#a0bb93" />
      <p>caretRight</p>
    </div>

    <div class="item">
      <EIcon name="caretSort" size="40" color="#abc1f5" />
      <p>caretSort</p>
    </div>

    <div class="item">
      <EIcon name="caretUp" size="40" color="#78a522" />
      <p>caretUp</p>
    </div>

    <div class="item">
      <EIcon name="chevronDown" size="40" color="#1edfd" />
      <p>chevronDown</p>
    </div>

    <div class="item">
      <EIcon name="chevronLeft" size="40" color="#470ea0" />
      <p>chevronLeft</p>
    </div>

    <div class="item">
      <EIcon name="chevronRight" size="40" color="#d15c06" />
      <p>chevronRight</p>
    </div>

    <div class="item">
      <EIcon name="chevronSort" size="40" color="#1ffdc4" />
      <p>chevronSort</p>
    </div>

    <div class="item">
      <EIcon name="chevronUp" size="40" color="#2e36d7" />
      <p>chevronUp</p>
    </div>

    <div class="item">
      <EIcon name="close" size="40" color="#273104" />
      <p>close</p>
    </div>

    <div class="item">
      <EIcon name="errorFilled" size="40" color="#7ad092" />
      <p>errorFilled</p>
    </div>

    <div class="item">
      <EIcon name="errorOutline" size="40" color="#2fb9e8" />
      <p>errorOutline</p>
    </div>

    <div class="item">
      <EIcon name="loading" size="40" color="#aee757" />
      <p>loading</p>
    </div>

    <div class="item">
      <EIcon name="misuse" size="40" color="#1d2f67" />
      <p>misuse</p>
    </div>
  </div>
</template>

<script  setup  lang="ts">
import { EIcon } from 'eurus-ui';
</script>

<style>
  .wrapper{
    padding: 0 10px;

    display: flex;
    flex-wrap: wrap;
  }

  .wrapper .item{
    display: flex;
    flex-shrink: 0;
    align-items: center;
    flex-direction: column;

    margin-bottom: 18px;
    margin-right: 18px;
  }
</style>
