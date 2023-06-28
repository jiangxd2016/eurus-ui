import { mount } from '@vue/test-utils';
import EEmpty from '..';

describe('empty', () => {
  it('empty snapshot', () => {
    const wrapper = mount(EEmpty);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
