import { useState, useRef, useCallback, useEffect, forwardRef } from 'react'

export default function () {
  const inputRef = useRef(null)
  const handleFoucsChildInput = () => {
    console.log('inputRef---', inputRef)
    inputRef.current.focus()
  }
  return (
    <>
      {/* <DemoSaveTimerByState /> */}

      {/* <DemoSaveTimerByGlobalVariable />
      <DemoSaveTimerByGlobalVariable /> */}

      {/* <DemoSaveTimerByRef /> */}

      <DemoTimeSlicing />

      <DemoSaveDomByRef />

      <div>
        <button onClick={handleFoucsChildInput}>
          父组件按钮点击使子组件input聚焦
        </button>
      </div>
      <ForwardDemoParentFocusChildInput ref={inputRef} />
    </>
  )
}

// 使用 state 存timerId -- 问题：设置timerId时触发多余的组件重新渲染
function DemoSaveTimerByState() {
  console.log('DemoSaveTimerByState render---')
  const [count, setCount] = useState(60)
  const [timerId, setTimerId] = useState(null)
  const handleStart = () => {
    const _timerId = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)

    setTimerId(_timerId) // 触发一次组件重新渲染
  }
  const handleStop = () => {
    clearInterval(timerId)
    setTimerId(null) // 触发一次组件重新渲染
  }

  const handleGetCount = () => {
    console.log(`count: ${count}`)
    console.log(`timerId: ${timerId}`)
  }

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>

      <button onClick={handleGetCount}>get current state</button>
    </div>
  )
}

// 使用全局变量存timerId -- 问题：组件多次使用时公用一个变量，互相影响(清除定时器时只能清除掉最后哪个组件的-多个组件多次更新全局变量，最终只剩最后一个组件的timerId。获取timerId也是获取的最后一个组件时创建的定时器id)
let _timerId = null
function DemoSaveTimerByGlobalVariable() {
  console.log('DemoSaveTimerByGlobalVariable render---')
  const [count, setCount] = useState(60)

  const handleStart = () => {
    _timerId = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)
  }
  const handleStop = () => {
    clearInterval(_timerId)
    _timerId = null
  }

  const handleGetCount = () => {
    console.log(`count: ${count}`)
    console.log(`timerId: ${_timerId}`)
  }

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>

      <button onClick={handleGetCount}>get current state</button>
    </div>
  )
}

// 使用 ref 来存储多次组件更新但保持不变的状态。ref的值更新(.current)不触发组件重新渲染
function DemoSaveTimerByRef() {
  console.log('DemoSaveTimerByRef render---')
  const [count, setCount] = useState(60)
  const timerRef = useRef(null)
  const handleStart = () => {
    timerRef.current = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)
  }
  const handleStop = () => {
    clearInterval(timerRef.current)
  }

  const handleGetCount = () => {
    console.log(`count: ${count}`)
    console.log(`timerId: ${timerRef.current}`)
  }

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>

      <button onClick={handleGetCount}>get current state</button>
    </div>
  )
}

// React时间切片原理
function DemoTimeSlicing() {
  console.log('DemoSaveTimerByRef render---')
  const [count, setCount] = useState(60)
  const timerRef = useRef(null)
  const handleStart = () => {
    timerRef.current = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)
  }
  const handleStop = () => {
    clearInterval(timerRef.current)
  }

  // 每次组件重新渲染，函数会重新创建，获取到最新组件渲染的上下文
  const handleGetCount = () => {
    console.log(`count: ${count}`)
    console.log(`timerId: ${timerRef.current}`)
  }

  // 使用useCallback缓存函数
  const handleGetCountByUseCallback = useCallback(() => {
    console.log(`count: ${count}`)
    console.log(`timerId: ${timerRef.current}`)
  }, [count]) // 依赖项数组，count变化时，重新生成缓存的函数。依赖项数组里之外的数据变更导致组件重新刷新时，跳过函数的重新创建

  // 使用useCallback缓存函数，但里面访问了state，却不将其放到依赖项数组中 -- 会导致，count发生更新，组件重新渲染，但缓存函数不重新生成，获取count时停留在之前的（第一次）时间切片状态里的数据状态
  const handleGetCountByUseCallbackButNoDependencies = useCallback(() => {
    console.log(`count: ${count}`)
    console.log(`timerId: ${timerRef.current}`)
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>

      <button onClick={handleGetCount}>get current state</button>
      <button onClick={handleGetCountByUseCallback}>
        get current state by memorization
      </button>
      <button onClick={handleGetCountByUseCallbackButNoDependencies}>
        get current state by memorization but with no dependencies
      </button>
    </div>
  )
}

// 使用 ref 保存dom
function DemoSaveDomByRef() {
  console.log('Counter render---')
  const [count, setCount] = useState(0)
  // 使用state来存储dom
  const [inputElementState, setInputElementState] = useState(null)
  useEffect(() => {
    const inputEle = document.getElementsByClassName('input')[0]
    setInputElementState(inputEle) // 触发一次多余的组件重新渲染
  }, [])
  const handleInputFocusByState = useCallback(() => {
    console.log(
      'handleInputFocusByState---inputElementState: ',
      inputElementState
    )
    inputElementState.focus()
    // eslint-disable-next-line
    // }, []) // 不传入依赖数组时，上面的setInputElementState执行完，组件重新渲染，但该缓存函数停留在上一个时间切片(此时其state中inputElementState还是null)，所以点击按钮执行该缓存函数时报Uncaught TypeError: Cannot read property 'focus' of null
  }, [inputElementState])

  // 使用ref来存储dom
  const inputRef = useRef(null)
  useEffect(() => {
    console.log('inputRef---', inputRef)
  }, [])
  const handleInputFocusByRef = useCallback(() => {
    inputRef.current.focus()
  }, [])

  return (
    <>
      <input className="input" type="text" ref={inputRef} />
      <button onClick={handleInputFocusByState}>
        click me to focus input by state
      </button>
      <button onClick={handleInputFocusByRef}>
        click me to focus input by ref
      </button>
      count: {count}
      <button onClick={() => setCount((prev) => prev + 1)}>add count</button>
    </>
  )
}

// 使用 forwardRef 让父组件聚焦子组件input
// 父组件给子组件函数挂了ref属性，则子组件必须使用React.forwardRef()包裹
// 否则报错 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
function DemoParentFocusChildInput(props, parentRef) {
  console.log(
    'DemoParentFocusChildInput render---props, parentRef---',
    props,
    parentRef
  )
  // parentRef.current = {
  //   focus () {
  //     console.log('myfocus---');
  //   }
  // }
  return <input type="text" ref={parentRef} />
}
const ForwardDemoParentFocusChildInput = forwardRef(DemoParentFocusChildInput)
