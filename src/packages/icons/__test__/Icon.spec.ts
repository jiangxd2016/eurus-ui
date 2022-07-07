import { mount } from '@vue/test-utils';
const pkg = await import('..');
describe('icon snapshots ', () => {

  it('all icon snapshots', () => {
    Object.keys(pkg).forEach((key) => {
      // key must be in pkg
      // @ts-expect-error
      const wrapper = mount((pkg[key]));
      expect(wrapper.html()).toMatchSnapshot();
      wrapper.unmount();
    });
  });
});
