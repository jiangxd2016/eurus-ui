import { mount } from '@vue/test-utils';
import ButtonGroup from '../src/button-group';

const AXIOM = '日后再来';

describe('ButtonGroup.vue', () => {
  test('render test', () => {
    const wrapper = mount(ButtonGroup, {
      slots: {
        default: AXIOM,
      },
    });
    expect(wrapper.text()).toEqual(AXIOM);
  });
});
