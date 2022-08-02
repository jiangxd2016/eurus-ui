<template>
  <div v-loading="loading" relative font-sans h-screen w-screen p="t2" text="center gray-700 dark:gray-200">
    <!-- <ESteps :active="1">
      <EStep title="步骤1" description="步骤1描述" />
      <EStep title="步骤2" description="步骤2描述" />
      <EStep title="步骤3" description="步骤3描述" />
      <EStep title="步骤4" description="步骤4描述" />
    </ESteps> -->

    <EAvatar size="sm">
      <img src="https://images.unsplash.com/photo-1619911510676-871fecb744f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
    </EAvatar>
    <EAvatar size="md" notice>
      <img src="https://images.unsplash.com/photo-1619911510676-871fecb744f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
    </EAvatar>
    <EAvatar size="lg" online>
      <img src="https://images.unsplash.com/photo-1619911510676-871fecb744f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
    </EAvatar>
    <EAvatar offline size="xl">
      <span>E</span>
    </EAvatar>
    <EDialog :show="modalShow" :title="modalTitle" @close="onDialogClose">
      <div>
        <p>Some contents...</p>
        <ECheckbox v-model="checkbox">123</ECheckbox>

        <p>Some contents...</p>
        <p>Some contents...</p>
      </div>
    </EDialog>

    <EDrawer :show="drawerShow" :title="modalTitle" @close="onDrawerClick">
      <p class="color-$e-color-primary">Some contents...</p>
      <p class="color-$e-color-primary">Some contents...</p>
      <p class="color-$e-color-primary">Some contents...</p>
    </EDrawer>
    <e-input />
    <e-date-picker />
    <e-divider direction="horizontal" />
    <e-switch :checked="switchValue" />
    <ERate :value="3" />

    <EUpload>
      <e-button>点击上传</e-button>
    </EUpload>
    <EButton @click="onDialogClick">open dialog</EButton>
    <EButton @click="onDrawerClick">open drawer</EButton>
    <EButton @click="onswitchrClick">open drawer</EButton>
    <EButton @click="link">link</EButton>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { EMessage } from 'eurus-ui';

const router = useRouter();
let loading = $ref(false);
let modalShow = $ref(false);
let drawerShow = $ref(false);
const modalTitle = $ref('title');
const checkbox = $ref(false);
let switchValue = $ref(false);
const onDialogClose = () => modalShow = false;
const onDialogClick = () => modalShow = true;
const onDrawerClick = () => drawerShow = !drawerShow;
const onswitchrClick = () => switchValue = !switchValue;
EMessage.msg({ type: 'info', message: 'this is  message', duration: 2000 });
const link = () => {
  router.push(`/hi/${encodeURIComponent(1)}`);
};
setTimeout(() => {
  loading = false;

  setTimeout(() => {
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 1000);
  }, 1000);
}, 2000);
</script>
