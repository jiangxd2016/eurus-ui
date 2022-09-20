import { mount } from '@vue/test-utils';
import EIcon from '..';
describe('icon snapshots ', () => {

  it('icon snapshots', () => {
    const wrapper = mount(EIcon, {
      props: {
        name: 'loading',
        size: 40
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('icon size', () => {
    const wrapper = mount(EIcon, { props: {
      name: 'loading',
      size: 40
    } });

    expect(wrapper.find('div').attributes('style')).include(
      'font-size: 40px;'
    );
    wrapper.unmount();
  });

  it('icon color', () => {
    const wrapper = mount(EIcon, { props: {
      name: 'loading',
      color: '#ccc'
    } });

    expect(wrapper.find('div').attributes('style')).include(
      'color: #ccc'
    );
    wrapper.unmount();
  });
});
