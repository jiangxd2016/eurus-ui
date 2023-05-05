import { createVNode, defineComponent } from 'vue';

export default defineComponent({
  name: 'EThead',
  setup(_, { slots }) {
    return () => {
      return createVNode(slots.thead?.()[0] ?? 'thead', null, {
        default: slots.default,
      });
    };
  },
});
