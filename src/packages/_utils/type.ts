import type { Ref, RenderFunction } from 'vue';
export type StringNumber = `${number}`;
export type Fn = () => void;
export type MaybeRef<T> = T | Ref<T>;

export type RenderContent = string | RenderFunction;
