import type { SpyInstance } from 'vitest';
import useEventListener from '@/packages/_hooks/useEventListener';

describe('eventListener', () => {
  const options = { capture: true };
  let stop: () => void;
  let target: HTMLDivElement;
  let removeSpy: SpyInstance;
  let addSpy: SpyInstance;
  beforeEach(() => {
    target = document.createElement('div');
    removeSpy = vitest.spyOn(target, 'removeEventListener');
    addSpy = vitest.spyOn(target, 'addEventListener');
  });

  it('should be defined', () => {
    expect(useEventListener).toBeDefined();
  });

  describe('given both none array', () => {
    const listener = vitest.fn();
    const event = 'click';

    beforeEach(() => {
      listener.mockReset();
      stop = useEventListener(target, event, listener, options);
    });

    it('should add listener', () => {
      expect(addSpy).toBeCalledTimes(1);
    });

    it('should trigger listener', () => {
      expect(listener).not.toBeCalled();
      target.dispatchEvent(new MouseEvent(event));
      expect(listener).toBeCalledTimes(1);
    });

    it('should remove listener', () => {
      expect(removeSpy).not.toBeCalled();

      stop();

      expect(removeSpy).toBeCalledTimes(1);
      expect(removeSpy).toBeCalledWith(event, listener, options);
    });
  });
  describe('given array of events but single listener', () => {
    const listener = vitest.fn();
    const events = ['click', 'scroll', 'blur', 'resize'] ;

    it('should add listener for all events', () => {
      events.forEach(event => expect(addSpy).toBeCalledWith(event, listener, options));
    });

    it('should trigger listener with all events', () => {
      expect(listener).not.toBeCalled();
      events.forEach((event, index) => {
        target.dispatchEvent(new Event(event));
        expect(listener).toBeCalledTimes(index + 1);
      });
    });

    it('should remove listener with all events', () => {
      expect(removeSpy).not.toBeCalled();

      stop();

      expect(removeSpy).toBeCalledTimes(events.length);
      events.forEach(event => expect(removeSpy).toBeCalledWith(event, listener, options));
    });
  });
});
