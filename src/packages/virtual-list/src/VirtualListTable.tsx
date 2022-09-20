import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    table: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return () => (
      props.table ? <table>
        {slots?.prepend && slots.prepend()}
        <tbody>
          {slots?.default && slots.default()}
        </tbody>
        {slots?.append && slots.append()}
      </table>
        : <div>
          {slots?.prepend && slots.prepend()}
          {slots?.default && slots.default()}
          {slots?.append && slots.append()}
        </div>
    );
  }
});
