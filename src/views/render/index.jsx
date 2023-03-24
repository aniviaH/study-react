import RenderFrame from './RenderFrame'
import TabView from './TabView'

export default function () {
  return (
    <>
      {/* 浏览器渲染帧 */}
      <RenderFrame />

      {/* useTransition */}
      <TabView />
    </>
  )
}
