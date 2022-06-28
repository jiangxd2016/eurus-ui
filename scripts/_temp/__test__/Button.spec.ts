import { mount } from '@vue/test-utils';
import Button from '..';

describe('button', () => {

  test('button snapshot', () => {
    const wrapper = mount(Button);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
