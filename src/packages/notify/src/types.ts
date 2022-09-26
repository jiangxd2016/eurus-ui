import type { AppContext, RenderFunction } from 'vue';
import type { MessageType } from '@/packages/_utils/constants';
import type { RenderContent } from '@/packages/_utils/types';

export const NOTIFICATION_POSITION = [
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
] as const;

export type NotifyPosition = typeof NOTIFICATION_POSITION[number];

export interface NotifyMethod {
  /**
   * @zh 显示信息提醒框
   * @en Show info notify
   */
  info: (
    config: string | NotifyConfig,
    appContext?: AppContext
  ) => NotifyReturn;
  /**
   * @zh 显示成功提醒框
   * @en Show success notify
   */
  success: (
    config: string | NotifyConfig,
    appContext?: AppContext
  ) => NotifyReturn;
  /**
   * @zh 显示警告提醒框
   * @en Show warning notify
   */
  warning: (
    config: string | NotifyConfig,
    appContext?: AppContext
  ) => NotifyReturn;
  /**
   * @zh 显示错误提醒框
   * @en Show error notify
   */
  error: (
    config: string | NotifyConfig,
    appContext?: AppContext
  ) => NotifyReturn;
  /**
   * @zh 清除全部提醒框
   * @en Clear all notifications
   */
  clear: (position?: NotifyPosition) => void;
}

export interface NotifyConfig {
  /**
   * @zh 内容
   * @en Content
   */
  content: RenderContent;
  /**
   * @zh 标题
   * @en Title
   */
  title?: RenderContent;
  /**
   * @zh 图标
   * @en Icon
   */
  icon?: RenderFunction;
  /**
   * @zh 唯一id
   * @en Unique id
   */
  id?: string;
  /**
   * @zh 位置
   * @en Position
   * @type 'topLeft'|'topRight'|'bottomLeft'|'bottomRight'
   */
  position?: NotifyPosition;
  /**
   * @zh 是否显示图标
   * @en Whether to show icon
   * @default true
   */
  showIcon?: boolean;
  /**
   * @zh 是否可关闭
   * @en Whether it can be closed
   */
  closable?: boolean;
  /**
   * @zh 显示的持续时间
   * @en Display duration
   * @default 3000
   */
  duration?: number;
  /**
   * @zh 底部内容
   * @en Footer Content
   * @version 2.25.0
   */
  footer?: RenderFunction;
  /**
   * @zh 关闭时的回调函数
   * @en Callback function when closing
   * @param id
   */
  onClose?: (id: number | string) => void;
}

export interface NotifyReturn {
  /**
   * @zh 关闭当前通知提醒框
   * @en Close the current notify
   */
  close: () => void;
}

export interface NotifyItem {
  id: number | string;
  type: MessageType;
  content: RenderContent;
  title?: RenderContent;
  icon?: RenderFunction;
  footer?: RenderFunction;
  showIcon?: boolean;
  closable?: boolean;
  duration?: number;
  resetOnUpdate?: boolean;
  onClose?: (id: number | string) => void;
}
