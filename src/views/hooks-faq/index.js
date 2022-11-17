
import {StateExample, RefExample} from './../../hooks-faq/what-can-i-do-if-my-effect-dependencies-change-too-often'
import HowDoIImplementShouldComponentUpdate from './../../hooks-faq/how-do-i-implement-shouldcomponentupdate'
import HowToMemoizeCalculations from './../../hooks-faq/how-to-memoize-calculations'
import HowToCreateExpensiveObjectsLazily from './../../hooks-faq/how-to-create-expensive-objects-lazily'

export default function () {

  return (
    <>
      <StateExample />

      {/* <RefExample count={1} /> */}
      
      <HowDoIImplementShouldComponentUpdate />

      <HowToMemoizeCalculations />

      <HowToCreateExpensiveObjectsLazily />
    </>
  )
}
