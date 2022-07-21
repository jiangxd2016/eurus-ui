import type { App } from 'vue';
import { createApp, h } from 'vue';
import EMessage from './src';
import type { MessageProps } from './src';
import { createGlobalNode } from '@/composables/useGlobalNode';

function Mesage(options: typeof MessageProps) {
  const Element = createGlobalNode('e-message');
  const app: App = createApp({
    name: 'EMessage',
    render() {
      return h(EMessage, {
        props: {
          ...options
        },
      });
    }
  });
  app.mount(Element);
  EMessage.instrace = app;
}

EMessage.install = (app: App) => {
  app.component(EMessage.name, EMessage);
};
EMessage.msg = Mesage;
export { EMessage };
export default EMessage;
