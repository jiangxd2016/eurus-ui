<template>
  <div id="back-top-test" style="height: 200px; width: 100%; overflow: auto">
    <div style="height: 500px">
      <EBackTop target="#back-top-test" height="10" />
    </div>
  </div>
  <!-- vitepress滚动的元素是html -->
  <EBackTop bottom="100" height="60" text="click me" target="html" />

  <EBackTop bottom="140" height="60" text="click me" target="html">
    <div style="display: flex; justify-content: center; align-items: center; width: 40px; height: 40px; background-color: #f2c037; border-radius: 50%">
      <EIcon name="arrowUp" color="#fff" size="lg" />
    </div>
  </EBackTop>
</template>
