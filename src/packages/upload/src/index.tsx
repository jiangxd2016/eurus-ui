import type { SetupContext } from 'vue';
import { defineComponent, toRef } from 'vue';
import './style.scss';
import EIcon from '@/packages/icons';

const uploadProps = {
  url: {
    type: String,
    default: ''
  },
  headers: {
    type: Object,
    default() {
      return {};
    }
  },
  fileList: {
    type: Array,
    default() {
      return [];
    }
  }
};

// interface File {
//   url?: string;
//   name?: string;
// }

export default defineComponent({
  name: 'EUpload',
  props: uploadProps,
  setup(props, { slots }: SetupContext) {
    const fileList = toRef(props, 'fileList');
    const fileListValue = fileList.value;
    const handleChange = (value: any) => {
      fileListValue.push(
        {
          name: value.target.files[0].name,
          size: value.target.files[0].size,
          type: value.target.files[0].type
        }
      );
    };

    const deleteFile = (index: number) => {
      fileListValue.splice(index, 1);
    };

    return () => (
      <div class="e-upload">
        <div class="e-upload-content">
          {slots.default && slots.default()}
          <input
            type="file"
            class="file"
            title=""
            onChange={handleChange} />
        </div>
        <div class="e-upload-list">
          {fileListValue.map((file: any, index: number) => {
            return (
              <div class="e-upload-list-item">
                <EIcon name='upload'></EIcon>
                <span class="e-upload-list-item-title">
                  <a
                    href={file.url}
                    download={file.name}
                  >{file.name}</a>
                </span>
                <span
                  class="e-upload-close"
                  onClick={() => deleteFile(index)}>
                  <EIcon name='close'></EIcon>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  data() {
    return {
      fileListValue: this.fileList
    };
  }
});

