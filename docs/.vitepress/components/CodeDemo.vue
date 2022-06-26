<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

import { computed, ref } from 'vue';
import VueRunning from 'vue-running';
import type { depLibsType } from 'vue-running';
import 'vue-running/dist/style.css';
import { LibraryJs, LibraryCss } from '../constants';

interface demoProps {
  options?: any;
  key: string;
  code: string;
  title?: string;
  describe?: string;
  description?: string;
  showCode?: boolean;
}
const props = defineProps<{ src: string;source: string; distCss: string; distJs: string }>();

const clipSuccess = ref(false);

const depLibs: depLibsType[] = [{
  name: 'eurus-ui',
  code: decodeURIComponent(props.distJs),
  type: 'js',
}, {
  name: 'eurus-ui-css',
  code: decodeURIComponent(props.distCss),
  type: 'css',
},
];
const demoInfo = computed<demoProps | any>(()=>{
  return {
    title: '',
    showCode: false,
    code: decodeURIComponent(props.source),
    describe: '',
    description: ''
  };
});
const copyHandler = () => {
  clipSuccess.value = false;
  const { copy, isSupported } = useClipboard({
    source: decodeURIComponent(demoInfo.value.code.replaceAll('&', '\'')),
  });

  isSupported && copy().then(()=>{
    clipSuccess.value = true;
    setTimeout(() => {
      clipSuccess.value = false;
    }, 2000);
  });

};

const codeMirrorOption = {
  readOnly: true,
  lineNumbers: false,
  scrollbarStyle: null,
  cursorBlinkRate: -1
};
</script>

<template>
  <ClientOnly>
    <div
      class="eurus-demo flex flex-col mb-8"
    >
      <h2 :id="demoInfo.title" tabindex="-1">{{ demoInfo.title }} <a class="header-anchor" :href="`#${demoInfo.title}`" aria-hidden="true">#</a></h2>

      <div class="demo-wrapper b-color-hex-DDDDDD b-1 rd">
        <div
          class="flex justify-between items-center text-sm py-2 px-2 <sm:text-md border-bottom  border-bottom border-gray-200 select-none"
        >
          <p class="m-0">{{ demoInfo.describe || '基础' }}</p>
          <!-- operation -->
          <div class="relative flex px-2 text-center justify-center">
            <div
              i-ph-code
              class="text-md cursor-pointer ml-4 <sm:text-sm"
              :class="[demoInfo.showCode ? 'active-code' : '']"
              @click="demoInfo.showCode = !demoInfo.showCode"
            />
          </div>
        </div>
        <!-- demo -->
        <div class="demo-component ">
          <VueRunning layout="vertical" :show-code="demoInfo.showCode" :dep-libs="depLibs" :code="demoInfo.code" :code-mirror-option="codeMirrorOption" />
        </div>

        <div v-if="demoInfo.showCode" class="example-code language-vue relative">
          <div
            i-ph-copy-thin
            class="absolute top-2 right-2 z-10 text-cool-gray-400 text-md cursor-pointer <sm:text-sm"
            @click="copyHandler()"
          />
          <transition name="fade">
            <span
              v-show="clipSuccess"
              class="block absolute left-1/2 top-1.5rem text-xs text-blue-500 bg-blue-gray-50 rounded-md shadow-sm"
              style="padding: 4px 10px; z-index: 9999; transform: translate(-50%, -80%)"
            >
              复制成功!
            </span>
          </transition>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style>
.border-bottom {
  border-bottom: 1px dotted rgba(229, 231, 235, 1);
}

.border-top-dotted {
  border-top-style: dotted;
}

.active-code {
  color: var(--c-brand);
}

.example-code {
  margin: 0 auto !important;
  width: 100%;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.01;
}
.fade-enter-active {
  transition: opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
}
.fade-leave-active {
  transition: opacity 250ms linear;
}

.demo-component .e-button{
    margin: 10px;
  }

.demo-component .e-button:last-of-type{
    margin-right: 0
  }
</style>
