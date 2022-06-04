<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

import { inject, reactive, ref } from 'vue';
import VueRunning from 'vue-running'
import type { depLibsType } from 'vue-running'
import 'vue-running/dist/style.css'
import { parse } from 'comment-parser';
import { LibraryJs, LibraryCss } from '../../constants';

interface demoProps {
  options?: any;
  key: string;
  code: string;
  title: string;
  describe: string;
  description: string;
  showCode: boolean;
}
const props = defineProps<{ component: string }>()
const commentReg = /\/\*(\s|.)*?\*\//gi

const demoList = reactive<demoProps[]>([])
const clipSuccess = ref(false)

const libJs = new URL(LibraryJs, import.meta.url).href;
const libCss = new URL(LibraryCss, import.meta.url).href;

const glob = inject<{ [key in string]: string }>('glob')

Object.entries(glob!).forEach((item) => {

  const [key, value] = item;
  if (key.includes(props.component)) {

    // 文件中有且必须只存在一处注释
    const { description = '', problems = [], tags = [] } = parse(value)[0]

    if (problems.length > 0) {
      console.warn(`${key} has problems`);
    }

    // 读取完成注释，删除掉注释
    const code = value.replace(commentReg, '').trim()

    demoList.push({
      key,
      ...Object.fromEntries(tags.map(item => [item.tag, item.name])) as any,
      description,
      showCode: true,
      code,
    })
  }

})

const depLibs: depLibsType[] = [{
  name: 'eurus-ui',
  url: libJs,
  type: 'js',
}, {
  name: 'eurus-ui-css',
  url: libCss,
  type: 'css',
},
]

const copyHandler = (index: number) => {
  clipSuccess.value = false;
  const { copy, isSupported } = useClipboard({
    source: decodeURIComponent(demoList[index].code.replaceAll('&', '\'')),
  })

  isSupported && copy().then(()=>{
    clipSuccess.value = true;
    setTimeout(() => {
      clipSuccess.value = false
    }, 2000);
  })

}

const codeMirrorOption = {
  readOnly: true,
  lineNumbers: false,
  scrollbarStyle: null,
  cursorBlinkRate: -1
}
</script>

<template>
  <ClientOnly>
    <div
      v-for="(demoInfo, index) in demoList" :key="demoInfo.key"
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
          <VueRunning :key="demoInfo.key" layout="vertical" :show-code="demoInfo.showCode" :dep-libs="depLibs" :code="demoInfo.code" :code-mirror-option="codeMirrorOption" />
        </div>

        <div v-if="demoInfo.showCode" class="example-code language-vue relative">
          <div
            i-ph-copy-thin
            class="absolute top-2 right-2 z-10 text-cool-gray-400 text-md cursor-pointer <sm:text-sm"
            @click="copyHandler(index)"
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
