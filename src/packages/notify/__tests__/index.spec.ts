import { mount } from '@vue/test-utils';
import ENotify from '..';
import ENotifyList from '../src/notifyList';
import sleep from '@/test-utils/sleep';

describe('ENotification', () => {
  test('should render notification', () => {
    const wrapper = mount(ENotifyList, {
      props: {
        notifications: [
          {
            id: 0,
            content: 'Info Message',
            type: 'info',
          },
          {
            id: 1,
            content: 'Success Message',
            type: 'success',
          },
          {
            id: 2,
            content: 'Warning Message',
            type: 'warning',
          },
          {
            id: 3,
            content: 'Error Message',
            type: 'error',
          },
        ],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should show & remove notification', async () => {
    const wrapper = mount({
      template:
        '<button id="add" @click="handleAdd">Add</button>'
        + '<button id="clear" @click="handleClear">Clear</button>',
      methods: {
        handleAdd() {
          ENotify.info({
            content: 'Info Message',
            closable: true,
            duration: 2000
          });
        },
        handleClear() {
          ENotify.clear();
        },
      },
    });

    const addBtn = wrapper.find('#add');
    await addBtn.trigger('click');
    await addBtn.trigger('click');

    expect(document.querySelectorAll('.eu-notify')).toHaveLength(2);
    (
      document.querySelector('.eu-notify-close-btn') as HTMLElement
    )?.click();

    await wrapper.find('#clear').trigger('click');
    expect(document.querySelectorAll('.eu-notify')).toHaveLength(0);
  });

  test('should emit close event', async () => {
    const wrapper = mount(ENotifyList, {
      props: {
        notifications: [
          {
            id: 0,
            content: 'Info Message',
            type: 'info',
            closable: true,
          },
        ],
      },
    });

    await wrapper.find('.eu-notify-close')?.trigger('click');
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  test('should update notification content', async () => {
    let count = 0;

    const wrapper = mount({
      template: `
        <button @click="handleClick">Click</button>`,
      methods: {
        handleClick() {
          ENotify.info({
            id: '1',
            content: `Info Message ${++count}`,
          });
        },
      },
    });

    const button = wrapper.find('button');
    await button.trigger('click');
    expect(document.querySelector('.eu-notify')?.textContent).toMatchInlineSnapshot(
      '"Info Message 1"'
    );
    await button.trigger('click');
    expect(document.querySelector('.eu-notify')?.textContent).toMatchInlineSnapshot(
      '"Info Message 2"'
    );
  });
});
