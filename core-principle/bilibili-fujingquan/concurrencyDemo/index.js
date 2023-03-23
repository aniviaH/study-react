

// 实现React的可终端渲染

function Counter () {
  // return (
    // <div>
    //   <span>helloWorld</span>
    //   <button>click me</button>
    // </div>
    // React.createElement('div', {}, React.createElement('span', {}, 'helloWorld'), React.createElement('button', {}, 'click me'))
  // )
  return {
    type: 'span',
    value: 'helloWorld',
    next: {
      type: 'button',
      value: 'click me'
    }
  }
}

// createElement转换成什么样子 concurrency 实际上是对createElement的执行结果进行可中断化

// 链表 --> useState hooks源码 都是要用链表 环形链表
const CounterElementDescriptor = {
  type: "Function",
  fn: Counter,
}

// 我们要做的就是如何将这堆数据进行可中断化
let presentWork = null; // 目前要做的工作
let rootElementDescriptor = null
let elementContainer = null

function performUnitOfWork(deadline) {
  // 双等会强制类型转换 undefined == null
  if (presentWork == null) { // 第二次进来就行span
    console.log('rootElementDescriptor', rootElementDescriptor);
    // 代表目前没有工作要做了
    commitRoot(rootElementDescriptor)
    return;
  }
  // 当前有工作我们还要看一个东西 这个东西不确定
  if (deadline.didTimeout) { // 当前帧是否还有额外的时间
    // 假设到span的时候，当前帧已经没有空闲时间了
    // 我们把任务推进下一帧执行

    // 这样做的话我们是不是把本来在一帧内执行完的渲染任务分到多帧去了
    // 假设当前帧没有时间了 --> 渲染工作停了 就好像是中断了

    requestIdleCallback(executeWorkLoop) // 把span推向下一帧
    // 如果span执行完以后，我们又要渲染button了 如果span真的要渲染16ms 那么我们又将button推进下一帧

    // 这样我们就保证了无论你的组件写的有多大 他实际上都会被拆分成很多个小的任务去分散到每一帧里去执行
    // 那这样的话就不会出现掉帧 用户的交互是不是不会失效
    return;
  }

  // 执行真正的工作
  if (presentWork.type === 'Function') {
    // 一个函数组件再怎么写 也不可能执行超过16ms的
    // 之前的 for 50000次
    // 常规的百分之九十九点九的函数执行时间是不可能超过16ms的 剩下百分之一你得看看是不是你自己写的有问题
    // 多个就有可能

    // 我们需要判定一下根组件
    if (!rootElementDescriptor) {
      rootElementDescriptor = presentWork // 代表保存一下根引用
    }
    // 代表是组件
    const fstChildren = presentWork.fn() // 执行非常多的逻辑 // 很多歌组件的非常多的逻辑加在一起就可能超过16ms
    console.log('children:', fstChildren);
    fstChildren.parent = presentWork; // 和fiber有关
    presentWork.children = fstChildren
    // 开始进入下一阶段的工作
    presentWork = fstChildren // 等于是把当前工作的元素从函数组件变成了第一个span元素
    performUnitOfWork(deadline) // 还是在当前帧做事情

    // 渲染完span 再接着渲染button
    // 假设渲染span就要耗费16ms
  } else {
    // 代表是dom元素
    const dom = document.createElement(presentWork.type)
    dom.innerHTML = presentWork.value
    // 不会马上塞到页面中去
    presentWork.dom = dom
    // 比方说你有class 事件 事件也要绑定上 ------
    // 等待commit阶段一次性提交到页面中去
    presentWork = presentWork.next // 转到button // buttong的next是不是没东西了
    performUnitOfWork(deadline) // 还是在当前帧做事情
  }
}

// 你把fiber直接挂到页面 生成真实dom的逻辑很简单 所以不可能卡帧
// 执行我们自己的工作的时候 去将一个大的任务拆分成多个任务去执行，让每一帧的最大可渲染单元为组件【当然如果本帧时间充裕的话是会渲染多个组件的，但是只要发现不充裕，立马推入下一帧】
// 如果说有连续两帧都没有时间，渲染就被推后了两帧 又意味着停止了两帧没有进行渲染工作，没有停止就是终端
// 所以这就是可中断渲染

function executeWorkLoop(deadline) {
  console.log('executeWorkLoop ------', deadline);
  // deadline.didTimeout: 表示当前帧是否还有空闲时间
  performUnitOfWork(deadline)
}

/// 做render阶段
function render (element) {
  elementContainer = element

  presentWork = CounterElementDescriptor
  requestIdleCallback(executeWorkLoop);
}

// 做commit阶段
function commitRoot (_rootElement) {
  // 进入commit阶段
  console.log('进入commit阶段，开始挨个的生成真实dom', _rootElement);

  let renderChildrenElements = _rootElement.children
  do {
    console.log('com in', renderChildrenElements);
    elementContainer.appendChild(renderChildrenElements.dom)

    renderChildrenElements = renderChildrenElements.next
  } while (renderChildrenElements)
}

render(document.getElementById('root'))

// requestIdleCallback -> 你给他传一个回调，他会在下一帧还有空闲时间的时候去执行对应的回调，如果下一帧没有足够的时间则不会执行你的回调