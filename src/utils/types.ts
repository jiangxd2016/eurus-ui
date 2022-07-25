import type { Ref } from 'vue';
import type { ReactiveVariable } from 'vue/macros';
/**
 * Maybe it's a ref, or a plain value
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T>
 * ```
 */
export type MaybeRef<T> = T | Ref<T>;
/**
 * Maybe it's a ref, or a plain value, or a getter function
 *
 * ```ts
 * type MaybeComputedRef<T> = T | Ref<T> | (() => T)
 * ```
 */
export type MaybeComputedRef<T> = T extends () => void
  ? never
  : (() => T) | MaybeRef<T>;

/**
 * Maybe it's a ref, or a plain value, or a getter function ,or reactive variable
 *
 * ```ts
 * type MaybeReactiveRef<T> = MaybeRef<T> | ReactiveVariable<T>
 * ```
 */
export type MaybeReactiveRef<T> = MaybeComputedRef<T> | ReactiveVariable<T>;

export const unique = <T>(arr: T[]) => [...new Set(arr)];

type Many<T> = T | ReadonlyArray<T>;
// TODO: rename to `ensureArray`
/** like `_.castArray`, except falsy value returns empty array. */
export const castArray = <T>(arr: Many<T>): T[] => {
  if (!arr && (arr as any) !== 0) { return []; }
  return Array.isArray(arr) ? arr : [arr];
};

export interface EurusOptions {
  classPrefix?: string;
  componentPrefix?: string;
}
