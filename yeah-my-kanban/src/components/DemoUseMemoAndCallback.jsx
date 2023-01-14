import React, { useState, useMemo } from 'react';

function fibonacci(n) {
  if (n <= 2) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

export default function UseMemoAndCallbackDemo() {
  // useMemo的使用场景，缓存执行成本较高的计算结果
  // const memoized = useMemo(() => createByHeavyComputing(a, b), [a, b]);
  //    --------           ----------------------------------  ------
  //       ^                            ^                         ^
  //       |                            |                         |
  //   工厂函数返回值                   工厂函数                  依赖值数组
  const [num, setNum] = useState('10');
  const sum = useMemo(() => {
    const n = parseInt(num, 10);
    return fibonacci(n);
  }, [num]);

  // useCallback的使用场景，获得记忆化的函数，使用返回的函数传给子组件，可减少子组件的更新
  // const memoizedFunc = useCallback(() => {/*省略*/}, [a, b]);
  //    ------------               ---------------   -----
  //         ^                            ^            ^
  //         |                            |            |
  //   记忆化的回调函数                   回调函数      依赖值数组

  // 使用useMemo的等价写法
  // const memoizedFunc = useMemo(() => () => {/*省略*/}, [a, b]);
  //    ------------           ---------------------   -----
  //       ^                      ^  ---------------      ^
  //       |                      |         ^             |
  // 工厂函数返回的回调函数        工厂函数   回调函数        依赖值数组

  return (
    <span>
      fibonacci(
      {num}
      ):
      {' '}
      {sum}
    </span>
  );
}
