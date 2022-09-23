<template>
  <div>
    <e-tabs>
      <e-tab-pane label="fix size">
        <e-virtual-list
          class="list scroll-touch" data-key="id" :data-sources="items" :data-component="Item"
          :estimate-size="50" item-class="list-item-fixed"
        />
      </e-tab-pane>
      <e-tab-pane label="dynamic size">
        <e-virtual-list
          class="list-dynamic scroll-touch" data-key="id" :data-sources="items" :data-component="Item"
          :estimate-size="80" item-class="list-item-dynamic"
        />
      </e-tab-pane>

      <e-tab-pane label="horizontal">
        <e-virtual-list
          class="list-horizontal" data-key="id" :data-sources="items" :data-component="Item"
          :estimate-size="110" wrap-class="wrapper" item-class="list-item-horizontal" direction="horizontal"
        />
      </e-tab-pane>
      <e-tab-pane label="loading">
        <e-virtual-list
          class="list-infinite scroll-touch" data-key="id" :data-sources="items" :data-component="Item"
          :estimate-size="70" item-class="list-item-infinite" footer-class="loader-wrapper"
          @tobottom="onScrollToBottom"
        >
          <template #footer>
            <div class="loader" />
          </template>
        </e-virtual-list>
      </e-tab-pane>
      <e-tab-pane label="page model">
        <e-virtual-list
          ref="vsl" class="list-page scroll-touch" data-key="id" :data-sources="items"
          :data-component="Item" :estimate-size="135" item-class="list-item-page" :page-mode="true"
        />
      </e-tab-pane>
    </e-tabs>
  </div>
</template>

<script lang="ts" setup>
import getRandomData from '../composables/useData';

import Item from './Item.vue';

let items = getRandomData();

function onScrollToBottom() {
  items = items.concat(getRandomData());
}
</script>

<style lang="scss">
.list {
  width: 100%;
  height: 500px;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;

}

.list-item-fixed {
  display: flex;
  align-items: center;
  padding: 0 1em;
  height: 60px;
  border-bottom: 1px solid;
  border-color: lightgray;
}

.list-dynamic {
  width: 100%;
  height: 500px;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;

}

.list-item-dynamic {
  display: flex;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid;
  border-color: lightgray;
}

.list-horizontal {
  width: 100vw;
  border: 2px solid;
  border-radius: 3px;
  overflow-x: auto;
  border-color: dimgray;
  display: flex;

}

.wrapper {
  display: flex;
  flex-direction: row;
}

.list-item-horizontal {
  border-right: 1px solid #dfdfdf;
}

.result {
  margin-bottom: 1em;
}

.list-infinite {
  width: 100%;
  height: 500px;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;
  position: relative;

  .list-item-infinite {
    display: flex;
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid;
    border-color: lightgray;
  }

  .loader-wrapper {
    padding: 1em;
  }

  .loader {
    font-size: 10px;
    margin: 0px auto;
    text-indent: -9999em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ffffff;
    background: linear-gradient(to right, #9b4dca 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    animation: load3 1.4s infinite linear;
    transform: translateZ(0);
  }

  .loader:before {
    width: 50%;
    height: 50%;
    background: #9b4dca;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @-webkit-keyframes load3 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes load3 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}

.list-page {
  width: 100%;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;

  .list-item-page {
    display: flex;
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid;
    border-color: lightgray;
  }
}

.bottom {
  padding: 2em 0;
}
</style>
