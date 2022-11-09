import { useState, useEffect, useLayoutEffect, useInsertionEffect } from "react";

export function ExampleUseEffect () {
  const [count, setCount] = useState(0)

  function handleCountChange () {
    setCount(c => c + 1)
  }

  // 使用 useEffect 完成副作用操作。赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。
  useEffect(() => {
    console.log('useEffect---count----', count)
    console.log('useEffect---document count---', document.getElementById('count').innerText);
    return () => {
      // 通常，组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源。要实现这一点，useEffect 函数需返回一个清除函数。
      // 为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除。在上述示例中，意味着组件的每一次更新都会创建新的订阅
      // 与 componentDidMount、componentDidUpdate 不同的是，传给 useEffect 的函数会在浏览器完成布局与绘制之后，在一个延迟事件中被调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因为绝大多数操作不应阻塞浏览器对屏幕的更新。
      console.log('清除useEffect---count----', count) // 每次执行清除函数，里面获取的数据是旧的
      console.log('清除useEffect---document count---', document.getElementById('count') && document.getElementById('count').innerText); // 每次执行清除函数，里面获取的dom是最新的（执行下一个 effect 之前，先清除上一个 effect-执行上一个effect的清除函数，传给 useEffect 的函数会在浏览器完成布局与绘制之后，在一个延迟事件中被调用 ）
    };
  }, [count]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect---count----', count)
    console.log('useLayoutEffect---document count---', document.getElementById('count') && document.getElementById('count').innerText);
  }, [count])

  // useInsertionEffect(() => {
  //   console.log('useInsertionEffect---count----', count)
  //   console.log('useInsertionEffect---document count---', document.getElementById('count') && document.getElementById('count').innerText);
  // }, [count])

  return (
    <>
      <p>---------------------------------------------</p>
      <h3>内置hook useEffect & useLayoutEffect</h3>

      <p id="count">{count}</p>
      <button onClick={handleCountChange}>add</button>
    </>
  )
}