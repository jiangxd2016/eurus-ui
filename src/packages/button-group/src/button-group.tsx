import './button-group.scss';

import { defineComponent } from 'vue';
export default defineComponent({
  name: 'RaButtonGroup',
  render() {
    return <div class="ra-button-group">
    {this.$slots?.default && this.$slots.default()}
  </div>;
  }
});
