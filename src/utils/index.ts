// 时间戳版节流函数
export function throttle<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let previous = 0;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - previous > delay) {
      func.apply(this, args);
      previous = now;
    }
  };
}
