import useInfinityScroll from "./useInfinityScroll";

test("useInfinityScroll() callback should be called when scroll is close to the bottom", () => {
  const eventMock = {
    currentTarget: {
      scrollHeight: 200, // Total available height
      scrollTop: 90, // Scrolled height
      clientHeight: 100 // Visible height
    }
  };

  const threshold = 10;

  const mockCallback = jest.fn();

  const onInfinityScroll = useInfinityScroll(mockCallback, threshold);

  onInfinityScroll(eventMock);

  expect(mockCallback.mock.calls.length).toBe(1);
});

test("useInfinityScroll() callback should not be called when scroll is not close to the bottom", () => {
  const eventMock = {
    currentTarget: {
      scrollHeight: 300, // Total available height
      scrollTop: 90, // Scrolled height
      clientHeight: 100 // Visible height
    }
  };

  const threshold = 10;

  const mockCallback = jest.fn();

  const onInfinityScroll = useInfinityScroll(mockCallback, threshold);

  onInfinityScroll(eventMock);

  expect(mockCallback.mock.calls.length).toBe(0);
});
