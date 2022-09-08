import { toRefs } from '@vue/reactivity';
import { getPrefixCls } from '../../_utils/global-config';

export const prefix = getPrefixCls('button');
export const btn = {
  // eslint-disable-next-line no-multi-str
  default: 'relative inline-flex items-stretch w-auto \
   h-auto py-4 px-16 text-14px font-medium leading-7 \
   cursor-pointer text-center no-underline align-middle \
   outline-0 border-0 rounded hover:opacity-60 \
   active:opacity-60 active:shadow-s-5 \
   before:absolute before:shadow-s-2 before:block \
   before:bottom-0 before:left-0 before:right-0 before:top-0',
  shape: {
    plain: 'bg-white text-gray-800 shadow-none',
    circle: 'rounded-full',
    round: 'rounded-xl ',
  },
  size: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  },
  color: {
    default: 'bg-white text-black',
    primary: 'bg-primary color-white',
    secondary: 'bg-secondary color-white',
    warning: 'bg-primary color-white',
    accent: 'bg-accent color-white',
    danger: 'bg-danger color-white',
  },
  state: {
    disable: 'opacity-70 cursor-not-allowed outline-0 shadow-none',
    link: false,
    loading: 'flex items-center w-5 mr-1 -mt-.5'
  },

  hover: 'opacity-60',
  active: 'opacity-60 shadow-s-5',
  before: ' shadow-s-2 content-empty block absolute bottom-0 left-0 right-0 top-0'

};
export function getClassNames(prefix: string) {

  return ({ color, size, state, shape }: { color: keyof typeof btn.color; size: keyof typeof btn.size; state: keyof typeof btn.state; shape: keyof typeof btn.shape })=>({
    [prefix]: btn.default,
    ...toRefs({
      [prefix + '.' + color]: btn.color[color] || '',
      [prefix + '--' + size]: btn.size[size] || '',
      [prefix + '.' + state]: btn.state[state] || '',
      [prefix + '.' + shape]: btn.shape[shape] || '',
    })
  });

}
