<template>
  <ETable :columns="columns" :data="data">
    <template #create_time="{ record }">
      <div>
        {{ record.create_time }}
      </div>
    </template>
    <template #option>
      <div>
        <e-button>编辑</e-button>
      </div>
    </template>
  </ETable>
</template>

<script lang="ts" setup>
const columns = [
  {
    title: '名称',
    slotName: 'name'
  },
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '标示',
    dataIndex: 'code'
  },
  {
    title: '备注',
    dataIndex: 'remark'
  },
  {
    title: '创建时间',
    slotName: 'create_time'
  },
  {
    title: '操作',
    slotName: 'option'
  }
];

const data = [
  {
    id: '1',
    code: '88',
    name: '99',
    model_code: 'B',
    model_name: 'B模型',
    remark: null,
    create_time: '2023-05-04T11:12:06.755101',
  },
  {
    id: '2',
    code: '66',
    name: '77',
    model_code: 'testModel3',
    model_name: '测试模型3',
    remark: null,
    create_time: '2023-05-04T11:09:56.898988',
  },
  {
    id: '3',
    code: '44',
    name: '55',
    model_code: 'testmodel1',
    model_name: '测试模型1',
    remark: null,
    create_time: '2023-05-04T11:09:35.807902',
  },
  {
    id: '4',
    code: '33',
    name: '44',
    model_code: 'testModel3',
    model_name: '测试模型3',
    remark: null,
    create_time: '2023-05-04T11:09:21.273010',
  },
  {
    id: '5',
    code: '11',
    name: '22',
    model_code: 'testmodel2',
    model_name: '测试模型2',
    remark: null,
    create_time: '2023-05-04T11:08:55.636926',
  },
  {
    id: '6',
    code: 'restasscreate-1',
    name: '测试资产新建-1',
    model_code: 'testmodel1',
    model_name: '测试模型1',
    remark: null,
    create_time: '2023-04-27T17:03:41.757985',
  },
  {
    id: '7',
    code: '9',
    name: '资产9',
    model_code: 'a',
    model_name: 'A模型',
    remark: null,
    create_time: '2023-04-26T10:24:14.865710',

  },
  {
    id: '8',
    code: '8',
    name: '资产8',
    model_code: 'a',
    model_name: 'A模型',
    remark: null,
    create_time: '2023-04-26T10:17:58.546062',

  },
  {
    id: '9',
    code: '7',
    name: '资产7',
    model_code: 'B',
    model_name: 'B模型',
    remark: null,
    create_time: '2023-04-25T15:14:08.164173',

  },
];
</script>
