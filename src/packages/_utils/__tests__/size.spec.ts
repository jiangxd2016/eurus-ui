import { getSize, sizeToPx } from '@/packages/_utils/size';

describe('size', () => {
  it('should work with size`', () => {
    expect(sizeToPx('md')).toBe(20);
    expect(getSize('md')).toBe('20px');
    expect(getSize(12)).toBe('12px');
    expect(getSize('12')).toBe('12px');
  });
});
