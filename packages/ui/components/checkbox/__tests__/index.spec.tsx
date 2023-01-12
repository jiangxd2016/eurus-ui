import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { expect } from 'vitest';
import ECheckbox from '..';
import ECheckboxGroup from '../src/checkbox-group';

describe('ECheckbox', () => {

  it('ECheckbox snapshot', () => {
    const wrapper = mount(ECheckbox);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('should emit change event', async () => {
    const fn = vi.fn();
    const wrapper = mount(ECheckbox, {
      props: {
        modelValue: false,
        onChange: fn

      }
    }
    );
    await wrapper.find('input').trigger('change');
    expect(fn).toHaveBeenCalled();
  });

  it('shod not emit change event when disabled', async () => {
    const fn = vi.fn();
    const wrapper = mount(ECheckbox, {
      props: {
        modelValue: false,
        onChange: fn,
        disabled: true
      }
    });
    await wrapper.find('input').trigger('change');
    expect(fn).not.toHaveBeenCalled();
  });

  it('should work emit change event in group', async () => {
    const fn = vi.fn();
    const wrapper = mount(ECheckboxGroup, {
      props: {
        modelValue: ['1'],
        onChange: fn
      },
      slots: {

        default: () => h(ECheckbox, { label: '1', value: '1' })
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
    await wrapper.findComponent(ECheckbox).find('input').trigger('change');
    expect(fn).toHaveBeenCalled();
  });

  it('should work with label props', () => {
    const wrapper = mount(ECheckbox, {
      props: {
        label: 'test'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('.eu-checkbox__label').text()).toBe('test');
  });
});

