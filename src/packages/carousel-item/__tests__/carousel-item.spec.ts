import { mount } from '@vue/test-utils';
import CarouselItem from '../../carousel/src/carousel-item.vue';

const AXIOM = 'Rem is the best girl';

describe('CarouselItem.vue', () => {
  test('render test', () => {
    const wrapper = mount(CarouselItem, {
      slots: {
        default: AXIOM,
      },
    });
    expect(wrapper.text()).toEqual(AXIOM);
  });
});
