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

  it('icon size', () => {
    const wrapper = mount(EIcon, {
      name: 'loading',
      size: '40'
    });

    expect(wrapper.find('div').attributes('style')).toContain(
      'font-size: 40px;'
    );
    wrapper.unmount();
  });
});
