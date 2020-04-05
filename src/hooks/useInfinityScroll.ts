function useInfinityScroll(callback: () => void, threshold = 200) {
  const onScroll = (e: any) => {
    const scrollTop = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    const clientHeight = e.currentTarget.clientHeight;

    if (scrollHeight <= scrollTop + clientHeight + threshold) {
      callback();
    }
  };

  return onScroll;
}

export default useInfinityScroll;
