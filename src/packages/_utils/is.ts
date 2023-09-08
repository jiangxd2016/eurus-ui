import type { StringNumber } from '@/packages/_utils/types';

export const _toString = Object.prototype.toString;
export const _hasOwnProperty = Object.prototype.hasOwnProperty;

export function isArray<T>(value: unknown): value is Array<T> {
	return Array.isArray(value);
}

export function isBoolean(value: unknown): value is boolean {
	return typeof value === 'boolean';
}

export function isDate(value: unknown): value is Date {
	return value instanceof Date;
}

export function isFunction(value: unknown): value is Function {
	return typeof value === 'function';
}

export function isNumber(value: unknown): value is number {
	return typeof value === 'number';
}

export function isString(value: unknown): value is string {
	return typeof value === 'string';
}

export function isPromise<T>(value: unknown): value is Promise<T> {
	return _toString.call(value) === '[object Promise]';
}

export function isUndefined(value: unknown): value is undefined {
	return typeof value === 'undefined';
}

export function isNull(value: unknown): value is null {
	return value === null;
}

export function isEmpty(value: unknown): boolean {
	if (!value && value !== 0) {
		return true;
	}
	if (isString(value)) {
		return value.length === 0;
	}
	if (isArray(value)) {
		return value.length === 0;
	}
	if (isObject(value)) {
		return Object.keys(value).length === 0;
	}
	return false;
}

export function isObject(value: unknown): value is Record<string, any> {
	return _toString.call(value) === '[object Object]';
}

export function isStringNumber(value: string): value is StringNumber {
	return !Number.isNaN(Number(value));
}

export const isKorean = (text: string): boolean => {
	return /([()|\u3130-\u318F\uAC00-\uD7AF])+/gi.test(text);
};
