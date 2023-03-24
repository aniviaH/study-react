import RenderFrame from './RenderFrame'
import TabView from './TabView'
import TransitionCase from './TransitionCase'

export default function () {
  return (
    <>
      {/* 浏览器渲染帧 */}
      <RenderFrame />

      {/* useTransition */}
      <TabView />

      <TransitionCase />
    </>
  )
}
