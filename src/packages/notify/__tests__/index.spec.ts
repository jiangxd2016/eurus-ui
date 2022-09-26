import { nextTick } from 'vue';
import ENotify from '..';
import sleep from '@/test-utils/sleep';

describe('ENotification', () => {

  it('ENotify snapshot', async () => {
    ENotify.info({ content: 'this is notify', duration: 2000 });

    await nextTick();

    expect(document.body.querySelector<HTMLElement>('.eu-overlay-notify')).toMatchSnapshot();
  });
  it('should be render content', async () => {

    ENotify.info({ content: 'this is notify', duration: 2000 });

    await nextTick();

    expect(document.body.querySelector<HTMLElement>('.eu-notify-content')?.innerHTML).toMatchInlineSnapshot('"this is notify"');
  });
  it('should be duration', async () => {
    ENotify.info({ content: 'this is notify', duration: 2000 });

    await nextTick();

    // destroy after 2000ms + 20ms
    await sleep(2020);

    expect(document.body.querySelector<HTMLElement>('.eu-overlay-notify')).toMatchInlineSnapshot('null');

  });
});
