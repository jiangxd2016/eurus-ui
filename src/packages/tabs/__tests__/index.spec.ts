import { mount } from '@vue/test-utils';
import ETabs from '..';

describe('ETabs', () => {

  it('ETabs snapshot', () => {
    const wrapper = mount(ETabs);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
