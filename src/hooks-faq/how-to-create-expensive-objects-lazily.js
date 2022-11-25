import {useState, useRef} from 'react'

// 如果依赖数组的值相同，useMemo 允许你 记住一次昂贵的计算。但是，这仅作为一种提示，并不 保证 计算不会重新运行。但有时候需要确保一个对象仅被创建一次。

// 第一个常见的使用场景是当创建初始 state 很昂贵时：
export default function () {
  const [count, setCount] = useState(100)

  return (
    <>
      <p>---------------------------------------------</p>
      <div>count: {count}</div>
      <button onClick={() => setCount(count => count + 1)}>点击count+1</button>
      {/* <Table count={count} /> */}
      <Image count={count} />
      {/* <Image2 count={count} /> */}
    </>
  )
}

function createRows (count) {
  console.log('createRows---被调用了')
  let rows = []
  for (let i = 0; i < count; i++) {
    rows.push({
      id: i,
      name: `name_${i}`
    })
  }

  return rows
}

function Table (props) {
  console.log('Table---渲染了');
  // ⚠️ createRows() 每次渲染都会被调用
  // const [rows, setRows] = useState(createRows(props.count)); // 但每次渲染时rows都取第一次执行的数据，后面的执行都会被忽略，不会更新到useState的返回值 https://react.docschina.org/docs/hooks-reference.html#usestate
  // console.log('rows---', rows);

  // 为避免重新创建被忽略的初始 state，我们可以传一个 函数 给 useState：
  // ✅ createRows() 只会被调用一次
  const [rows2, setRows2] = useState(() => createRows(props.count));
  // console.log('rows2---', rows2);
  // React 只会在首次渲染时调用这个函数。

  return (
    <>
      <div>Table {props.count}</div>
    </>
  )
  // ...
}

// 你或许也会偶尔想要避免重新创建 useRef() 的初始值。举个例子，或许你想确保某些命令式的 class 实例只被创建一次：
function Image (props) {
  function onIntersect () {
    console.log('onIntersect---')
  }
  function createIntersectionObserver() {
    console.log('createIntersectionObserver---')
    const io = new IntersectionObserver(onIntersect)
    console.log('io---', io);
  }
  // ⚠️ IntersectionObserver 在每次渲染都会被创建
  const ref = useRef(createIntersectionObserver())

  function onViewRefData () {
    console.log('onViewRefData---ref', ref.current)
  }
  onViewRefData()
  return (
    <>
      <div >Images {props.count}</div>
      <button onClick={onViewRefData}>点击查看ref</button>
    </>
  )
}

// useRef 不会 像 useState 那样接受一个特殊的函数重载。相反，你可以编写你自己的函数来创建并将其设为惰性的：
function Image2(props) {
  const ref = useRef(null);

  function onIntersect () {
    console.log('onIntersect---')
  }

  // ✅ IntersectionObserver 只会被惰性创建一次
  function getObserver(props) {
    console.log('getObserver-----');
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // 当你需要时，调用 getObserver()
  // ...
  console.log('ref---', ref, ref.current)
  function onViewRefData () {
    console.log('onViewRefData---ref', ref.current)
  }
  return (
    <>
      <div>Image2 {props.count}</div>
      <button onClick={() => getObserver()}>点击初始化ref</button>
      <button onClick={onViewRefData}>点击查看ref</button>
    </>
  )
}
// 这避免了我们在一个对象被首次真正需要之前就创建它。如果你使用 Flow 或 TypeScript，你还可以为了方便给 getObserver() 一个不可为 null 的类型。