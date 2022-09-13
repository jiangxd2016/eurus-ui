import type { App } from 'vue';
import EUpload from './src';

EUpload.install = (app: App) => {
  app.component(EUpload.name, EUpload);
};

export { EUpload };
export default EUpload;
// const props = withDefaults(
//   defineProps<{
//     modelValue?: any
//     name?: string // input标签的 name 属性
//     action?: string // 上传地址
//     multiple?: boolean // 是否支持多选文件
//     accept?: string // h5原生属性，接受上传的文件类型，即打开上传框时默认选择的类型
//     data?: Object // 附加请求的参数
//     headers?: Object // 上传请求 header 数据
//     format?: string // 支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用，多个用豆号隔开
//     maxSize?: number // 最大上传限制kb，0不限制
//     timeout?: number // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
//     auto?: boolean // 是否需要点击按钮上传,false需要点击
//     drag?: boolean // 允许拖动上传
//     disabled?: boolean
//     limit?: number // 允许上传的最大数量0不限制
//     showFileList?: boolean // 是否显示已上传文件列表
//     listType?: string // 文件列表的类型 text/picture
//   }>(),
//   {
//     name: 'file',
//     listType: 'text',
//     auto: true,
//     showFileList: true,
//     maxSize: 0,
//     timeout: 0,
//     limit: 0
//   }
// )
// const emits = defineEmits<{
//   (e: 'update:modelValue', modelValue: string): void
//   (e: 'change', modelValue: any): void
//   (e: 'error', val: any): void
//   (e: 'success', res: any, callback: any): void
//   (e: 'remove', val: any): void
// }>()
