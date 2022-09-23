import { mount } from '@vue/test-utils';
import { markRaw, nextTick } from 'vue';
import EVirtualList from '..';
import Item from './item';
import { getDatas } from './util';
import makeScroll from '@/test-utils/make-scroll';

describe('EVirtualList', () => {
  const Instance = mount(EVirtualList, {
    props: {
      dataSources: getDatas(1000),
      dataComponent: markRaw(Item),
      dataKey: 'id',
      direction: 'horizontal',
      wrapClass: 'wrapper',

    }, attrs: {
      style: 'width: 300px; height: 300px; overflow: auto;',
      class: 'my-list'
    }
  });

  it('EVirtualList snapshot', () => {
    expect(Instance.html()).toMatchSnapshot();
  });
  it('EVirtualList default render', () => {
    expect(Instance.find('.my-list').exists()).toBe(true);
    expect(Instance.findAll('.inner')).toHaveLength(30);
  });
  it('EVirtualList scroll', async () => {

    makeScroll(Instance.element, 'scrollTop', 1000);
    await nextTick();

    Instance.findAll('.inner').forEach((item, index) => {

      // expect(item.text()).toBe(String(index + 30));
    });
    expect(Instance.findAll('.inner')).toHaveLength(30);

  });
});
