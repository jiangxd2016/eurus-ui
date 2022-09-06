<template>
  <div relative font-sans h-screen p2 text="center gray-700 dark:gray-200">
    <EButton @click="onDialogClick">open dialog</EButton>
    <EButton @click="onDrawerClick">open drawer</EButton>
    <EButton @click="onswitchrClick">open drawer</EButton>
    <EButton @click="link">link</EButton>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { EButton } from 'eurus-ui';
// setTimeout(() => {
//   loading = false;

//   setTimeout(() => {
//     loading = true;
//     setTimeout(() => {
//       loading = false;
//     }, 1000);
//   }, 1000);
// }, 2000);
const router = useRouter();
const loading = $ref(false);
let modalShow = $ref(false);
let drawerShow = $ref(false);
const modalTitle = $ref('title');
const checkbox = $ref(false);
let switchValue = $ref(false);
const onDialogClose = () => modalShow = false;
const onDialogClick = () => modalShow = true;
const onDrawerClick = () => drawerShow = !drawerShow;
const onswitchrClick = () => switchValue = !switchValue;
// EMessage.msg({ type: 'info', message: 'this is  message', duration: 2000 });
const link = () => {
  router.push(`/hi/${encodeURIComponent(1)}`);
};
const disabledDate = (time: string) => {

  // if (dayjs(time).isBefore(dayjs().add(-1, 'day').subtract(1, 'day'))) {
  //   return false;
  // }
  return true;
};

const dateRangeList = ref<string[]>(['2022.08.09', '2222.08.09']);

const onDateRangeChange = (dateList: string[]) => {
  dateRangeList.value = dateList;
};

// page
const page = ref(1);
const updateHandler = (currentPage: number) => {
  page.value = currentPage;
};
</script>
