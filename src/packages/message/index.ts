import type { App, AppContext } from 'vue';
import EMessage from './src';
import type { MessageMethod } from '@/packages/message/src/interface';
import { MESSAGE_TYPES } from '@/packages/_utils';

const types = [...MESSAGE_TYPES, 'loading', 'normal'] as const;
const Message: any = {
  ...EMessage,
  install: (app: App): void => {
    const _message = {
      clear: EMessage.clear,
    } as MessageMethod;

    for (const key of types) {
      _message[key] = (config, appContext = app._context) => {

        return EMessage[key](config, appContext);
      };
    }

    app.config.globalProperties.$message = _message;
  },
  _context: null as AppContext | null,
};
export { Message };
export default Message;
