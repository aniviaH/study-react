import RenderFrame from './RenderFrame'
import TabView from './TabView'
import TransitionCase from './TransitionCase'
import TestTS from './TestTS.tsx'
import MyUseState from './MyHooks/useState'

export default function () {
  return (
    <>
      {/* 浏览器渲染帧 */}
      <RenderFrame />

      {/* useTransition */}
      <TabView />

      <TransitionCase />

      <TestTS />

      <MyUseState />
      <MyUseState />
      <MyUseState />
    </>
  )
}
