/*
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);

返回一个 memoized 回调函数。

把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。
 */

/*
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

返回一个 memoized 值。

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行不应该在渲染期间内执行的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。

你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的
 */

import { useCallback, useState, memo, useMemo } from 'react'

const fun1Set = new Set()
const fun2Set = new Set()
const fun3Set = new Set()

export function ExampleUseCallback1() {
  const [count, setCount] = useState(0)

  //示例1包裹了useCallBack的函数
  const fun1 = useCallback(() => {
    console.log('示例一函数')
  }, [])

  //示例2没有包裹useCallBack的函数
  const fun2 = () => {
    console.log('示例二函数')
  }

  // 示例3包裹了useCallBack的函数，但有依赖项数据
  // const fun3 = useCallback(() => {
  //   console.log('useCallback回调函数依赖count---', count);
  // }, [count])

  // useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
  const fun3 = useMemo(() => {
    return () => {
      console.log('useCallback回调函数依赖count---', count)
    }
  }, [count])

  fun1Set.add(fun1)
  fun2Set.add(fun2)
  fun3Set.add(fun3)

  console.log('count变化，每次渲染时---')
  console.log('fun1Set.size---', fun1Set.size) // fun1会一直创建相同的函数内存地址
  console.log('fun2Set.size---', fun2Set.size) // fun2会一直创建不同的函数内存地址
  console.log('fun3Set.size---', fun3Set.size) // fun2会一直创建不同的函数内存地址

  /* 
  一：useCallBack不是每个函数都需要使用！

  1.为什么不用useCallBack把每个函数都包一下呢?

  2.useCallBack不是缓存工具吗？

  3.将每个函数都缓存不是可以更好提升性能吗？

  useCallBack是一个缓存工具没错。但实际上他并不能阻止函数都重现构建。

  看上方这种结构的组件,Com组件中包含了fun1和fun2两个函数

  是不是认为当Com组件重新渲染的时候，只有fun2（没有使用useCallBack的函数）函数会被重新构建，而fun1（使用了useCallBack的函数）函数不会被重新构建。

  实际上，被useCallBack包裹了的函数也会被重新构建并当成useCallBack函数的实参传入。

  useCallBack的本质工作不是在依赖不变的情况下阻止函数创建，而是在依赖不变的情况下不返回新的函数地址而返回旧的函数地址。不论是否使用useCallBack都无法阻止组件render时函数的重新创建！！

  每一个被useCallBack的函数都将被加入useCallBack内部的管理队列。而当我们大量使用useCallBack的时候，管理队列中的函数会非常之多，任何一个使用了useCallBack的组件重新渲染的时候都需要去便利useCallBack内部所有被管理的函数找到需要校验依赖是否改变的函数并进行校验。

  在以上这个过程中，寻找指定函数需要性能，校验也需要性能。所以，滥用useCallBack不但不能阻止函数重新构建还会增加“寻找指定函数和校验依赖是否改变”这两个功能，为项目增添不必要的负担。 */

  return (
    <>
      <h3>内置hook useCallback</h3>
      <p>count: {count}</p>
      <button onClick={() => setCount((count) => count + 2)}>
        点击更新count
      </button>
    </>
  )
}

/* 二：useCallBack在什么情况下使用？
在往子组件传入了一个函数并且子组件被React.momo缓存了的时候使用 */

/* 
如上所说的，useCallBack的作用不是阻止函数创建，而是在依赖不变的情况下返回旧函数地址（保持地址不变）。

React.memo()，是一种缓存技术。

简单说，React.memo()是通过校验props中的数据是否改变的来决定组件是否需要重新渲染的一种缓存技术，具体点说React.memo()其实是通过校验Props中的数据的内存地址是否改变来决定组件是否重新渲染组件的一种技术。

假设我们往子组件（假设子组件为Child组件）传入一个函数呢？当父组件的其他State（与Child组件无关的state）改变的时候。那么，因为状态的改变，父组件需要重新渲染，那被React.memo保护的子组件（Child组件）是否会被重新构建？ */

/* React.memo检测的是props中数据的栈地址是否改变。而父组件重新构建的时候，会重新构建父组件中的所有函数（旧函数销毁，新函数创建，等于更新了函数地址）,新的函数地址传入到子组件中被props检测到栈地址更新。也就引发了子组件的重新渲染。

所以，在上面的代码示例里面，子组件是要被重新渲染的。

那么如何才能让子组件不进行重新渲染呢？useCallBack的正确使用方法来了。
使用useCallBack包一下需要传入子组件的那个函数。那样的话，父组件重新渲染，子组件中的函数就会因为被useCallBack保护而返回旧的函数地址，子组件就不会检测成地址变化，也就不会重选渲染。 */

/* 我们只需要使用useCallBack保护一下父组件中传入子组件的那个函数（toChildFun函数）保证它不会在没有必要的情况下返回一个新的内存地址就好了。 */

export function ExampleUseCallback2() {
  return <Parent></Parent>
}

export function Parent() {
  const [parentState, setParentState] = useState(0) // 父组件的state
  const [count, setCount] = useState(0)

  // 需要传入子组件的函数
  const toChildFun = () => {
    console.log('需要传入子组件的函数')
  }

  const toChildFunFromUseCallback = useCallback(() => {
    console.log('需要传入子组件的函数-被useCallback包裹')
  }, [])

  //
  return (
    <>
      <p></p>
      {/* <button onClick={() => setParentState(val => val + 1)}>点击我改变父组件中与Child组件（被Memo包裹）无关的state</button> */}
      <button onClick={() => setParentState(parentState + 1)}>
        点击我 改变父组件中 与Child组件无关的state（Child组件需要被Memo包裹）)
      </button>

      {/* 更新parentState不会触发子组件更新 */}
      {/* <Child count={count}></Child> */}

      {/* 更新parentState会触发子组件更新 */}
      {/* <Child parentState={parentState}></Child> */}

      {/* 将父组件的函数传入子组件 */}
      {/* 更新parentState会触发子组件更新 */}
      {/* <Child fun={toChildFun}></Child> */}

      {/* 更新parentState不会触发子组件更新-虽然传递给子组件的是函数，但是被useCallback包裹缓存了，除非因为依赖更新产生新的回调函数(内存地址不一样) */}
      <Child fun={toChildFunFromUseCallback}></Child>
    </>
  )
}

const Child = memo(() => {
  console.log('我被打印了就说明子组件重新构建了')
  return <div>子组件</div>
})

/* 总结
useCallBack不要每个函数都包一下，否则就会变成反向优化，useCallBack本身就是需要一定性能的
useCallBack并不能阻止函数重新创建,它只能通过依赖决定返回新的函数还是旧的函数,从而在依赖不变的情况下保证函数地址不变
useCallBack需要配合React.memo使用 */
