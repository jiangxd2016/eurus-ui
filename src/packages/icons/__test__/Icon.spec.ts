import { mount } from '@vue/test-utils';
import EIcon from '..';
describe('icon snapshots ', () => {

  it('icon snapshots', () => {
    const wrapper = mount(EIcon, {
      name: 'loading'
    });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
