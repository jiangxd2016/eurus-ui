import { mount } from '@vue/test-utils';
import ELoading from '..';

describe('ELoading', () => {

  it('ELoading snapshot', () => {
    const wrapper = mount(ELoading);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
  it('ELoading props', () => {

    const wrapper = mount(ELoading, {
      props: {
        text: '123',
        modelValue: true,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  }
  );

});
