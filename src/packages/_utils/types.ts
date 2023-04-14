import type { Ref, RenderFunction } from 'vue';
export type StringNumber = `${number}`;
export type Fn = () => void;
export type MaybeRef<T> = T | Ref<T>;

export type Data = Record<string, any>;

export type RenderContent = string | RenderFunction;

export interface EuOptions {
  classPrefix?: string;
  componentPrefix?: string;
}
export const DIRECTIONS = ['horizontal', 'vertical'] as const;
export type Direction = typeof DIRECTIONS[number];

export type BaseType = string | number;
export const TRIGGER_EVENTS = [
  'hover',
  'click',
  'focus',
  'contextMenu',
] as const;
export type TriggerEvent = typeof TRIGGER_EVENTS[number];
export const TRIGGER_POSITIONS = [
  'top',
  'tl',
  'tr',
  'bottom',
  'bl',
  'br',
  'left',
  'lt',
  'lb',
  'right',
  'rt',
  'rb',
] as const;
export type TriggerPosition = typeof TRIGGER_POSITIONS[number];
export type ClassName =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];
