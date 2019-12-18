export const sleep = (timeOut: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, timeOut));
