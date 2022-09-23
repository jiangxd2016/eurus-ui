import { mount } from '@vue/test-utils';
import { markRaw } from 'vue';
import EVirtualList from '..';
import { VirtualProps } from '../src/props';
import Item from './item';
import { getDatas } from './util';

describe('EVirtualList', () => {
  const Instance = mount(EVirtualList, {
    props: {
      dataSources: getDatas(1000),
      dataComponent: markRaw( Item),
      dataKey: 'id',
      direction: 'horizontal',
      wrapClass: '{ \'display\': \'flex\', \'flex-direction\': \'row\' }'

    }, attrs: {
      style: 'width: 300px; height: 300px; overflow: auto;',
      class: 'my-list'
    }
  });

  it('EVirtualList snapshot', () => {
    expect(Instance.html()).toMatchSnapshot();
    expect(Instance.find('.my-list').exists()).toBe(true);
  });
});
