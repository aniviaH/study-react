import {useState, useEffect, useRef} from 'react'

// https://react.docschina.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often

// 如果我的 effect 的依赖频繁变化，我该怎么办？
// 有时候，你的 effect 可能会使用一些频繁变化的值。你可能会忽略依赖列表中 state，但这通常会引起 Bug：

/**
 * 
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // 这个 effect 依赖于 `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` 没有被指定为依赖

  return <h1>{count}</h1>;
}

传入空的依赖数组 []，意味着该 hook 只在组件挂载时运行一次，并非重新渲染时。
但如此会有问题，在 setInterval 的回调中，count 的值不会发生变化。因为当 effect 执行时，我们会创建一个闭包，并将 count 的值被保存在该闭包当中，且初值为 0。
每隔一秒，回调就会执行 setCount(0 + 1)，因此，count 永远不会超过 1。

 * 
 */


// 指定 [count] 作为依赖列表就能修复这个 Bug，但会导致每次改变发生时定时器都被重置。
// 事实上，每个 setInterval 在被清除前（类似于 setTimeout）都会调用一次。但这并不是我们想要的。
// 要解决这个问题，我们可以使用 setState 的函数式更新形式。它允许我们指定 state 该 如何 改变而不用引用 当前 state：
export function StateExample () {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ 在这不依赖于外部的 `count` 变量
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ 我们的 effect 不使用组件作用域中的任何变量

  return <h1>{count}</h1>;
}
// （setCount 函数的身份是被确保稳定的，所以可以放心的省略掉）
// 此时，setInterval 的回调依旧每秒调用一次，但每次 setCount 内部的回调取到的 count 是最新值（在回调中变量命名为 c）。

export function RefExample (props) {
  // 把最新的 props 保存在一个 ref 中
  const latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });

  useEffect(() => {
    function tick() {
      // 在任何时候读取最新的 props
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // 这个 effect 从不会重新执行
}