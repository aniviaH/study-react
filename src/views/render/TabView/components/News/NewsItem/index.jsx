export default function NewsItem({ newDescriptor }) {
  // 拖一下时间 卡一下帧
  // 分析：
  // js 一个时间段只能做一件事
  // 在当前帧里在走这段for循环(500个这段for循环)，那他就没有精力去响应用户的点击
  // concurrency --> 任务拆分 组件 归根结底是你组件加载时间太长了 而concurrency任务拆分的最小单元是组件和react元素
  // 也就是说，正常情况下 所有的组件合在一起渲染 要花费2秒钟 那在这2秒钟之内 用户的所有响应全部失效(当前帧都被这个2秒钟任务占完了)
  // 那么有了concurrency以后，react会把这么多合在一起的组件拆分成最小单元塞入每一帧里 每个最小单元就有了自己的执行时长 那只要单个组件的执行周期不超过16ms就不会卡帧了（这个时长只要在一帧最长时间16ms之内就不会卡帧影响用户响应）
  // 但是 如果单个组件执行就超过了16ms 依旧会出现卡顿 这就不是concurrency能处理的范围了
  // 本质上是因为News这个组件执行的渲染时间太长了
  // 其实我们是希望 点击首页 -> 再点击新闻页面 -> 再点击关于我们 的时候 中间新闻页面停止渲染
  // 换句话来讲 我们是希望切换tab这个行为的【优先级】要高于News页面渲染的【优先级】
  // 我们希望 从首页 -> 新闻列表 -> 关于我们 这个时候新闻列表的渲染工作直接被react手动强制中断
  for (let i = 0; i < 80; i++) {
    console.log('i', newDescriptor, i)
  }

  return <div>newsItem: {newDescriptor}</div>
}
