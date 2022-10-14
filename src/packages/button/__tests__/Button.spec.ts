import { mount } from '@vue/test-utils';
import EButton from '..';

describe('button', () => {

  it('button snapshot', () => {
    const wrapper = mount(EButton);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
  it('should be render button props type', () => {

    const propsTypes = ['default', 'text', 'primary', 'info', 'success', 'warning', 'error', 'purple'] as const;

    propsTypes.forEach((type: string) => {
      const wrapper = mount(EButton, {
        props: {
          type
        }
      });
      expect(wrapper.classes()).toContain('eu-button--' + type);
      wrapper.unmount();

    });
  });

  it('should be render button size', () => {
    const sizeList = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizeList.forEach((size: string) => {
      const wrapper = mount(EButton, {
        props: {
          size,
        }
      });
      expect(wrapper.classes()).toContain('eu-button--' + size);
      wrapper.unmount();
    });
  });

  it('should button disabled', async () => {

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
  it('should button loading', async () => {
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
  it('should be render button native props', () => {
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
