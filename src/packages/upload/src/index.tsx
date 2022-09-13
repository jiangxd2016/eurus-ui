import { defineComponent, reactive, ref } from 'vue';
import './style.scss';
import { axiosUpload, getObjectURL } from './comm';
import { getPrefixCls } from '@/packages/_utils/global-config';
const prefixCls = getPrefixCls('upload');
export default defineComponent({
  name: 'EUpload',
  props: {
    modelValue: null,
    name: { default: 'file' },
    action: null,
    multiple: { type: Boolean },
    accept: null,
    data: null,
    headers: null,
    format: null,
    maxSize: { default: 0 },
    timeout: { default: 0 },
    auto: { type: Boolean, default: true },
    drag: { type: Boolean },
    disabled: { type: Boolean },
    limit: { default: 0 },
    showFileList: { type: Boolean, default: true },
    listType: { default: 'text' }
  },
  emits: ['update:modelValue', 'change', 'error', 'success', 'remove'],
  setup(props, { slots, emit: emits, expose }) {

    const isObject
      = Object.prototype.toString.call(props.modelValue) === '[object Object]';
    const inputEl = ref();
    const state: any = reactive({
      tempFiles: isObject ? [props.modelValue] : props.modelValue || [],
      tempUpload: [], // 存储待上传文件，用于手动上传
      source: ''
    });

    // 单位换算
    const unitFormat = (size: number) => {
      if (size === 0) { return '0B'; }
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(size) / Math.log(k));
      return (size / k ** i).toPrecision(3) + sizes[i];
    };
    // 检查文件合法性
    const check = (file: File) => {
      let error = {
        code: 0,
        msg: ''
      };
      const name = file.name;
      const suffix = name.slice(- 3, name.length - 3 + 3).toLocaleLowerCase();
      if (props.format && !props.format.toLocaleLowerCase().includes(suffix)) {
        const format = props.format ? props.format.toString() : '';
        error = { code: 2, msg: '只支持上传类型为：' + format };
      }
      const fileSize = file.size;
      if (fileSize && fileSize && props.maxSize > props.maxSize * 1024) {
        error = { code: 1, msg: '超出上传限制' };
      }
      return error;
    };

    const updateModelValue = () => {
      if (props.multiple) {
        // 多个时返回数组
        emits('update:modelValue', state.tempFiles);
      } else {
        // 单个时返回object
        emits('update:modelValue', state.tempFiles[0] || {});
      }
    };

    // 上传后清空input的值，否则不能上传相同的
    const clear = () => {
      inputEl.value.value = '';
    };
    const getStatusName = (obj: any) => {
      let text = '';
      switch (obj.status) {
        case 0:
          text = '待上传';
          break;
        case 1:
          text = '正在上传' + obj.loaded + '%';
          break;
        case 2:
          text = '上传成功';
          break;
        case -1:
          text = '上传失败';
          break;
      }
      return text;
    };

    const getAxiosUpload = (file: File, id: string) => {
      const data = {
        fileName: state.fileName, // 上传文件名，如123.jpg
        name: props.name, // 文件域的name值
        action: props.action,
        headers: props.headers,
        data: props.data,
        timeout: props.timeout
      };
      let index = 0;
      state.tempFiles.forEach((item: any, i: number) => {
        if (item.id === id) {
          index = i;
        }
      });
      state.tempFiles[index].status = 1; // 更新状态正在上传
      axiosUpload(file, data, (res: any, type: string) => {
        switch (type) {
          case 'source':
            state.source = res;
            break;
          case 'loaded':
            state.tempFiles[index].loaded = res;
            break;
          case 'success':
            emits('success', res, (url?: string, status?: number) => {
              state.tempFiles[index].status = status || 2;
              if (url) {
                state.tempFiles[index].url = url; // 使用服务端返回的地址
              }
            });
            clear();
            break;
          case 'error':
            emits('error', res);
            state.tempFiles[index].status = -1;
            clear();
            break;
        }
      });
    };

    const fileDragOver = (e: any) => {
      e.preventDefault();
    };
    // 取消事件
    const cancelRequest = () => {
      // 给点击取消的元素绑定上即可 ， 取消上传请求
      if (state.source) {
        state.source.cancel('cancel upload'); // 这里传递的什么字符串，在上面的rej.message值就是什么
        clear();
      }
    };
    // 删除事件
    const remove = (index: number) => {
      emits('remove', state.tempFiles[index]);
      state.tempFiles.splice(index, 1);
      updateModelValue();
    };
    const onFileChange = (evt: any, type?: string) => {
      emits('change', evt);
      if (!props.multiple) {
        // 多个时上传后再清除
        state.tempFiles = [];
        state.tempUpload = [];
      }
      let file = evt;
      if (type !== 'drag') {
        file = evt.target && evt.target.files;
      }
      if (file) {
        for (const element of file) {
          const checkResult = check(element);
          if (!checkResult.code) {
            // 校验通过
            let src = undefined;
            if (/image\/\w+/.test(element.type)) {
              src = getObjectURL(element);
            }
            const id = element.size + Date.now().toString(); // 弄个唯一标识
            // 判断超出个数限制
            if (props.limit && state.tempFiles.length >= props.limit) {
              return;
            }
            state.tempFiles.push({
              size: unitFormat(element.size), // 大小
              loaded: 0, // 上传进度
              name: element.name,
              url: src, // 预览用的src
              type: element.type,
              status: 0, // 上传状态，0等待上传，1正在上传，2成功，-1失败，由接口返回后修改
              id
            });
            if (props.auto) {
              getAxiosUpload(element, id);
            } else {
              // 手动上传时保存
              state.tempUpload.push({ file: element, index: id });
            }
            // 存在没有校验通过的

          } else if (!props.multiple) {
            // 单个文件上传时，放error里提示
            emits('error', checkResult);
            return;
          }

        }
      }
      updateModelValue();
    };
    const fileDrop = (e: any) => {
      e.preventDefault();
      // const file = e.dataTransfer.files[0] // 获取到第一个上传的文件对象
      onFileChange(e.dataTransfer.files, 'drag');
    };
    // 手动上传
    const upload = () => {
      if (!props.auto) {
        state.tempUpload.forEach(async (item: any) => {
          await getAxiosUpload(item.file, item.index);
        });
      }
    };
    expose({ upload, cancelRequest });

    return () => (
      <div
        class={{
          [prefixCls]: true,
          disabled: props.disabled,
          ['upload-' + props.listType]: props.listType
        }}
      >
        {
         !( props.limit && props.limit <= state.tempFiles.length)
          && <label
            class={{ 'upload-file': true, 'drag-file': props.drag }}
            onDragover={fileDragOver}
            onDrop={fileDrop}
          >
            <input
              ref={inputEl}
              style="display: none"
              type="file"
              multiple={props.multiple}
              accept={props.accept}
              name={props.name}
              disabled={props.disabled}
              onChange={onFileChange}
            />
            {slots.default ? slots.default() : <i class="default-btn icon-plus"></i>}

          </label>

        }
        {
          props.showFileList && <div class="upload-list">
            <ul>
              {
                state.tempFiles.map((item: any, index: number) => {
                  return <li
                    key={item.url}
                    class={['status-' + (item.status || '')]}
                  >
                    {props.listType === 'text'
                      ? <span>{item.name}</span>
                      : <img src={item.url} alt="" />
                    }
                    {item.status !== undefined && <span class="status">
                      <b>{getStatusName(item)}</b>
                      {item.status === 1 && <i class="progress" style={{ width: item.loaded + '%' }}></i>}
                    </span>}

                    <i class="icon-del" onClick={() => remove(index)}></i>
                  </li>;
                })
              }

            </ul>
          </div>
        }

      </div>
    );
  }

});

