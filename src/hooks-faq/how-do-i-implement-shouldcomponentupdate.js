import {memo, useState} from 'react'

export default function () {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>---------------------------------------------</p>

      <button onClick={() => setCount(count => count + 2)}>点击更改count, 查看子组件是否更新</button>

      {/* <Child count={count} /> */}
      <MemoChild count={count} />
    </>
  )
}

export function Child (props) {
  console.log('Child 渲染了---props: ', props)
  return (
    <>
      <div>I'm Child, count from parent is {props.count}</div>
    </>
  )
}

// React.memo 等效于 PureComponent，但它只比较 props
export const MemoChild = memo(
  Child,
  function (prevProps, nextProps) {
    // memo 第二个参数指定一个自定义的比较函数来比较新旧 props。如果函数返回 true，就会跳过更新。
    console.log('MemoChild---compare函数执行')
    console.log('prevProps: ', prevProps)
    console.log('nextProps: ', nextProps)
    if (nextProps.count !== prevProps.count) {
      // 更新
      return false
    }
    return true
  }
)