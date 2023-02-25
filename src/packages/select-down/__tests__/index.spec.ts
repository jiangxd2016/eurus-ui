import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import ESelectDown from '..';

describe('ESelectDown', () => {
  const options = [
    {
      value: '1',
      label: '1'
    },
    {
      value: '2',
      label: '2'
    }
  ];
  it('should work with `size` props', () => {
    const size = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    size.forEach((item) => {
      const wrapper = mount(ESelectDown, {
        props: {
          size: item
        }
      });
      expect(wrapper.html()).toMatchSnapshot();
      wrapper.unmount();
    });
  });
  it('should work with slot and modelValue', () => {
    const wrapper = mount(ESelectDown, {
      props: {
        modelValue: '1',
        placeholder: '请选择'
      },
      slots: {
        default: options.map((item) => {
          return `<li class="select-down-option" value="${item.value}">${item.label}</li>`;
        })
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('.eu-select-down-single').text()).toBe('1');
    expect(wrapper.findAll('.select-down-option').length).toBe(2);
    wrapper.unmount();
  });

  it('should work with `clear` with props', () => {

    const modelValue = ref(['1', '2']);
    const wrapper = mount(ESelectDown, {
      props: {
        'modelValue': modelValue.value,
        'placeholder': '请选择',
        'clear': true,
        'multiple': true,
        'onUpdate:modelValue': (val: any[]) => {
          modelValue.value = val;
        }
      }
    });
    expect(wrapper.find('.clear-icon"').exists()).toBeTruthy();
    wrapper.find('.clear-icon').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(modelValue.value).toEqual([]);
    wrapper.unmount();
  });

  it('should work with keydown event', async () => {

    const wrapper = mount(ESelectDown, {
      props: {
        modelValue: '1',
        placeholder: '请选择'
      },
      slots: {
        default: options.map((item) => {
          return `<li class="select-down-option" value="${item.value}">${item.label}</li>`;
        })
      }
    });
    await wrapper.find('.eu-select-down-control').trigger('keydown', {
      code: 'Enter',
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('.eu-select-down-panel').isVisible()).toBeTruthy();

    await wrapper.find('.eu-select-down-control').trigger('keydown', {
      code: 'Escape',
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('.eu-select-down-panel').attributes().style).toBe('display: none;');
    wrapper.unmount();
  });

  it('should work with `disabled | readonly` props', async () => {
    const wrapper = mount(ESelectDown, {
      props: {
        modelValue: '1',
        placeholder: '请选择',
        disabled: true,
      },
      slots: {
        default: options.map((item) => {
          return `<li class="select-down-option" value="${item.value}">${item.label}</li>`;
        })
      }
    });
    expect(wrapper.classes()).toContain('eu-select-down-disabled');
    wrapper.unmount();
  });
});
