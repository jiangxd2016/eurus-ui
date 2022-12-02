import { mount } from '@vue/test-utils';
import EInput from '..';

describe('EInput', () => {

  it('EInput snapshot', () => {
    const wrapper = mount(EInput);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('should  emit input event', async () => {
    const fn = vitest.fn();
    const wrapper = mount(EInput, {
      props: {
        value: 'Test',
        onInput: fn
      }
    });
    const input = wrapper.find('input');
    input.element.value = 'Test2';
    await input.trigger('input');

    expect(fn).toHaveBeenCalled();

    wrapper.unmount();

  });

  it('should work with clearable prop', async () => {
    const fn = vitest.fn();
    const wrapper = mount(EInput, {
      props: {
        'modelValue': 'test',
        'clearable': true,
        'onUpdate:modelValue': fn
      }
    });

    await wrapper.find('.eu-input-clearable').trigger('click');
    expect(fn).toHaveBeenCalled();
    wrapper.unmount();
  });

});
