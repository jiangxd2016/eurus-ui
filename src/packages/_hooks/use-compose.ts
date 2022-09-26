export const notifyCompose = (...fns: any[]) => {
  const composer = fns.reduce(
    (a, b) => (...args: any[]) => a(b(...args))
  );

  return composer;
};
