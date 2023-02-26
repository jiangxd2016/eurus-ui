import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import EDatePicker from '..';
import EuSelectDown from '../../select-down';

describe('EDatePicker ', () => {

  it('should work with `modelValue` props', async () => {

    const wrapper = mount(EDatePicker, {
      props: {
        modelValue: undefined
      },
    });
    wrapper.setProps({ modelValue: '2023-02-26' });
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();

    expect(wrapper.findComponent(EuSelectDown).find('.eu-select-down-single').text()).toBe('2023-02-26');

    wrapper.setProps({ modelValue: '2023-02-27' });
    await nextTick();
    expect(wrapper.findComponent(EuSelectDown).find('.eu-select-down-single').text()).toBe('2023-02-27');
  });

});
