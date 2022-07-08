import { defineComponent } from 'vue';
const IconProps = {
  size: Number,
  color: String
};

export default function defineIcon(fn: { name: string; render: Function }) {
  return defineComponent({
    name: fn.name,
    props: IconProps,
    setup(props) {
      // const mergeStyles = computed(() => {
      //   return {
      //     fontSize: props.size,
      //     color: props.color
      //   };
      // });
      return fn.render();
    },
  });
}
