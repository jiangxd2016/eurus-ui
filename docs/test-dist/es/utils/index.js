import { defineComponent } from "vue";
const createDemoModule = (name, demos) => defineComponent({
  name: `${name}-demo`,
  setup() {
    return {
      demos
    };
  }
});
export {
  createDemoModule
};
