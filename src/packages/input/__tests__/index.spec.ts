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
  it('should work with disable prop', () => {
    const wrapper = mount(EInput, {
      props: {
        disabled: true
      }
    });
    expect(wrapper.find('.eu-input-wrapper--disabled').exists()).toBe(true);
    wrapper.unmount();
  });

  it('should work with size prop', () => {
    const size = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    size.forEach((size) => {
      const wrapper = mount(EInput, {
        props: {
          size
        }
      });
      expect(wrapper.find('.eu-input-wrapper--' + size).exists()).toBe(true);
      wrapper.unmount();
    }
    );
  });
  it('should work with showWordLimit and maxLength prop', async () => {
    const wrapper = mount(EInput, {
      props: {
        modelValue: '12345678901',
        showWordLimit: true,
        maxLength: 10
      }
    });

    expect(wrapper.find('input').attributes('maxlength')).toBe('10');
    expect(wrapper.find('.eu-input-suffix').find('.eu-input-word-limit').exists()).toBe(true);
  });
});
