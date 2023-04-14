import { createVNode, defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Tbody',
  setup(_, { slots }) {
    return () => {
      return createVNode(slots.tbody?.()[0] ?? 'tbody', null, {
        default: slots.default,
      });
    };
  },
});
