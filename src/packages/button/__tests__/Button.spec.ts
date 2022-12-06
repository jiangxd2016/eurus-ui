import { mount } from '@vue/test-utils';
import EButton from '..';

describe('button', () => {

  it('should work with `type` prop', () => {

    (['default', 'text', 'primary', 'info', 'success', 'warning', 'error', 'purple'] as const).forEach((type) => {
      const wrapper = mount(EButton, { props: { type }, slots: { default: type } });
      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.classes()).toContain('bg-' + type);
      wrapper.unmount();

    });
  });

  it('should work with `size` prop', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      const wrapper = mount(EButton, { props: { size }, slots: { default: size } });
      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.classes()).toContain('eu-button--' + size);
      wrapper.unmount();

    });
  });

  it('should work button disabled', async () => {

    const onClick = vitest.fn();
    const wrapper = mount(EButton, { props: { disabled: true, onClick, } });

    expect(wrapper.classes()).toContain('disabled');
    await wrapper.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
    wrapper.unmount();
  }
  );
  it('should work button loading', async () => {
    const onClick = vitest.fn();
    const wrapper = mount(EButton, { props: { loading: true } });

    expect(wrapper.classes()).toContain('disabled');
    await wrapper.trigger('click');
    expect(onClick).not.toHaveBeenCalled();

    wrapper.unmount();
  }
  );
  it('should work render button native props', () => {
    const wrapper = mount(EButton, {
      props: { native: { type: 'submit' } } });

    expect(wrapper.attributes('type')).toContain('submit');

    wrapper.unmount();
  });

});
