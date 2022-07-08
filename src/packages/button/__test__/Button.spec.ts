import { mount } from '@vue/test-utils';
import EButton from '..';

describe('button', () => {

  test('button snapshot', () => {
    const wrapper = mount(EButton);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
  test('button props type', () => {

    const propsTypes = ['default', 'text', 'primary', 'info', 'success', 'warning', 'error', 'purple'] as const;

    propsTypes.forEach((type: string) => {
      const wrapper = mount(EButton, {
        props: {
          type
        }
      });
      expect(wrapper.classes()).toContain('e-button--' + type);
      wrapper.unmount();

    });
  });

  test('button size', () => {
    const sizeList = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizeList.forEach((size: string) => {
      const wrapper = mount(EButton, {
        props: {
          size,
        }
      });
      expect(wrapper.classes()).toContain('e-button--' + size);
      wrapper.unmount();
    });
  });

  test('button disabled', async () => {

    const onClick = vitest.fn();
    const wrapper = mount(EButton, {
      props: {
        disabled: true,
        onClick,
      }
    });

    expect(wrapper.classes()).toContain('disabled');
    await wrapper.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
    wrapper.unmount();
  }
  );
  test('button loading', async () => {
    const onClick = vitest.fn();
    const wrapper = mount(EButton, {
      props: {
        loading: true
      }
    });

    expect(wrapper.classes()).toContain('disabled');
    await wrapper.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
    wrapper.unmount();
  }
  );
  test('button native props', () => {
    const wrapper = mount(EButton, {
      props: {
        native: {
          type: 'submit'
        }
      }
    });

    expect(wrapper.attributes('type')).toContain('submit');

    wrapper.unmount();
  });

});
