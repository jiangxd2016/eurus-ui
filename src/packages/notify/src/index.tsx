import type { AppContext, Ref } from 'vue';
import { createVNode, reactive, ref, render } from 'vue';
import type { NotifyConfig, NotifyItem, NotifyMethod, NotifyPosition } from './types';
import NotifyList from './notifyList';
import { isUndefined, isFunction, isString } from '@/packages/_utils/isType';
import { MESSAGE_TYPES } from '@/packages/_utils/constants';
import type { MessageType } from '@/packages/_utils/constants';
import { getOverlay } from '@/packages/_utils/dom';
import './style.scss';
type _NotifyConfig = NotifyConfig & {
  type: MessageType;
};
const notificationInstance: {
  topLeft?: NotifyManger;
  topRight?: NotifyManger;
  bottomLeft?: NotifyManger;
  bottomRight?: NotifyManger;
} = {};
class NotifyManger {
  private readonly notificationIds: Set<number | string>;

  private readonly notifications: Ref<NotifyItem[]>;

  private readonly position: NotifyPosition;

  private container: HTMLElement | null;

  private notificationCount = 0;

  constructor(config: _NotifyConfig, appContext?: AppContext) {
    const { position = 'topRight' } = config;
    this.container = getOverlay('notify');
    this.notificationIds = new Set();
    this.notifications = ref([]);
    this.position = position;

    const vm = createVNode(NotifyList, {
      notifications: this.notifications.value,
      position,
      onClose: this.remove,
      onAfterClose: this.destroy,
    });

    if (appContext ?? NotifyList._context) {
      vm.appContext = appContext ?? NotifyList._context;
    }
    render(vm, this.container);
    document.body.append(this.container);
  }

  add = (config: _NotifyConfig) => {
    this.notificationCount++;
    const id = config.id ?? `__eu_notification_${this.notificationCount}`;
    if (this.notificationIds.has(id)) {
      return this.update(id, config);
    }
    const Notify: NotifyItem = reactive({ id, ...config });
    this.notifications.value.push(Notify);
    this.notificationIds.add(id);

    return {
      close: () => this.remove(id),
    };
  };

  update = (id: number | string, config: _NotifyConfig) => {
    for (let i = 0; i < this.notifications.value.length; i++) {
      if (this.notifications.value[i].id === id) {
        const resetOnUpdate = !isUndefined(config.duration);
        Object.assign(this.notifications.value[i], {
          ...config,
          id,
          resetOnUpdate,
        });
        break;
      }
    }
    return {
      close: () => this.remove(id),
    };
  };

  remove = (id: number | string) => {
    for (let i = 0; i < this.notifications.value.length; i++) {
      const item = this.notifications.value[i];

      if (item.id === id) {
        if (isFunction(item.onClose)) {
          item.onClose(id);
        }

        this.notifications.value.splice(i, 1);
        this.notificationIds.delete(id);
        break;
      }
    }
  };

  clear = () => {
    this.notifications.value.splice(0);
  };

  destroy = () => {
    if (this.notifications.value.length === 0 && this.container) {
      render(null, this.container);
      this.container.remove();
      this.container = null;
      notificationInstance[this.position] = undefined;
    }
  };
}

export const Notify = MESSAGE_TYPES.reduce((pre, value) => {
  pre[value] = (config, appContext?: AppContext) => {
    if (isString(config)) {
      config = { content: config as string };
    }

    const _config: _NotifyConfig = { type: value, ...config as NotifyConfig };
    const { position = 'topRight' } = _config;
    if (!notificationInstance[position]) {
      notificationInstance[position] = new NotifyManger(
        _config,
        appContext
      );
    }
    return notificationInstance[position]!.add(_config);
  };
  return pre;
}, {} as NotifyMethod);

Notify.clear = (position?: NotifyPosition) => {
  if (position) {
    notificationInstance[position]?.clear();
  } else {
    Object.values(notificationInstance).forEach(item => item?.clear());
  }
};
