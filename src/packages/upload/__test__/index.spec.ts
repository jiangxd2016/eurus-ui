import { mount } from '@vue/test-utils';
import EUpload from '..';

describe('EUpload', () => {

  it('EUpload snapshot', () => {
    const wrapper = mount(EUpload);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
