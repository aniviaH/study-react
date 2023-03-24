import { useCallback, useMemo, useState, useTransition } from 'react'
import Home from './components/Home'
import News from './components/News'
import About from './components/About'

// 现在要做的就是让切换tab以后的渲染不要影响切换tab本身的工作

export default function TabView() {
  // pending --> 代表当前是否有transition任务在执行
  // startTransition --> 代表开启一个transition 任务
  const [pending, startTransition] = useTransition()
  // 好比 loading startRequest

  // home news about
  const [presentActiveTab, setPresentActiveTab] = useState('home')

  const tabs = useMemo(() => {
    return [
      {
        key: 'home',
        label: '首页',
        component: <Home />,
      },
      {
        key: 'news',
        label: '新闻页面',
        component: <News />,
      },
      {
        key: 'about',
        label: '关于我们',
        component: <About />,
      },
    ]
  }, []) // 如果没有依赖的话这个tabs就不会变化

  const presentComponent = useMemo(() => {
    return tabs.find((tabItem) => tabItem.key === presentActiveTab).component
  }, [tabs, presentActiveTab])

  const changeTab = useCallback(
    (tab) => {
      // setPresentActiveTab(tab) // 切换tab的工作

      // react底层内部源码中区分的
      // 变为一个transition工作，transition工作是低优先级的 他不会阻塞用户的交互 也不会让页面失去响应
      startTransition(() => {
        console.log('pending: ', pending)
        // 首页 -> 新闻页面 -> 关于我们
        // 从首页 切换到 新闻页面 pending: false
        // 在新闻页面未渲染完时 切换到 关于我们 pending: true 新闻页面的渲染工作(里面的for循环打印)立即停止，然后渲染关于我们页面
        // 再次从关于我们 切换 到首页 pending: false
        setPresentActiveTab(tab)
      })
    },
    [pending]
  )
  const changeTabByParentTransition = useCallback((tab) => {
    setPresentActiveTab(tab)
  }, [])

  return (
    <div>
      {/* 1. 展示tab 2. 切换tab渲染不同的页面 */}
      {tabs.map((tabItem) => {
        return (
          // <button key={tabItem.key} onClick={() => changeTab(tabItem.key)}>
          //   {tabItem.label}
          // </button>

          // 写在触发事件里面也可以
          <button
            key={tabItem.key}
            onClick={() => {
              startTransition(() => {
                console.log('pending: ', pending)
                changeTabByParentTransition(tabItem.key)
              })
            }}
          >
            {tabItem.label}
          </button>
        )
      })}
      <div>{pending ? '正在loading...' : null}</div>
      {presentComponent}
    </div>
  )
}
