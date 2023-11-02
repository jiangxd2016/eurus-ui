import type { StyleValue } from 'vue';

declare global {
	const __DEV__: boolean;
	namespace JSX {
		interface IntrinsicAttributes extends ReservedProps {
			class?: any;
			style?: StyleValue;
		}
	}
}
