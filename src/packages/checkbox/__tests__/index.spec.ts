import { mount } from '@vue/test-utils';
import ECheckbox from '..';

describe('ECheckbox', () => {

  it('ECheckbox snapshot', () => {
    const wrapper = mount(ECheckbox);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('checkbox click', async () => {

    const onChange = vitest.fn();
    const wrapper = mount(ECheckbox, {
      modelValue: false,
      onChange
    });
    await wrapper.trigger('click');
    expect(onChange).not.toHaveBeenCalled();
    wrapper.unmount();
  });

});
