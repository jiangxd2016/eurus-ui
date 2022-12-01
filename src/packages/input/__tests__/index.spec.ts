import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import EInput from '..';

describe('EInput', () => {

  it('EInput snapshot', () => {
    const wrapper = mount(EInput);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  // it('should be emit change event', async () => {
  //   const fn = vitest.fn();
  //   const val = ref('test');
  //   const wrapper = mount(EInput, {
  //     props: {
  //       value: val,
  //       onChange: fn
  //     }
  //   });
  //   val.value = 'test1';
  //   const input = wrapper.find('input');
  //   await input.trigger('change');

  //   expect(fn).toHaveBeenCalled();

  // });

});
