import RenderFrame from './RenderFrame'
import TabView from './TabView'
import TransitionCase from './TransitionCase'
import TestTS from './TestTS.tsx'

export default function () {
  return (
    <>
      {/* 浏览器渲染帧 */}
      <RenderFrame />

      {/* useTransition */}
      <TabView />

      <TransitionCase />

      <TestTS />
    </>
  )
}
