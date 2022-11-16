import { useState, useMemo } from "react";

// useMemo Hook 允许你通过「记住」上一次计算结果的方式在多次渲染的之间缓存计算结果：
// const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
// 这行代码会调用 computeExpensiveValue(a, b)。但如果依赖数组 [a, b] 自上次赋值以来没有改变过，useMemo 会跳过二次调用，只是简单复用它上一次返回的值。

export default function () {
  const [a, setA] = useState(100)
  const [b, setB] = useState(900)
  const [c, setC] = useState(1)

  const computeExpensiveValue =  (a, b) => {
    console.log('computeExpensiveValue 执行了')
    let count = 0
    for (let i = 0; i < 10000000; i++) {
      count += (a + b)
    }
    console.log('count---', count)
  }
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])

  return <>
    <p>---------------------------------------------</p>
    <button onClick={() => setA(a => a + 1)}>点击更新a</button>
    <button onClick={() => setB(b => b + 2)}>点击更新b</button>
    <button onClick={() => setC(c => c + 3)}>点击更新c</button>
    <Parent a={a} b={b} />
    <div>c: {c}</div>
  </>
}

function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}

function Child1 ({a}) {
  console.log('Child1 渲染了---', a);
  return (
    <div>a: {a}</div>
  )
}

function Child2 ({b}) {
  console.log('Child2 渲染了---', b);
  return (
    <div>b: {b}</div>
  )
}