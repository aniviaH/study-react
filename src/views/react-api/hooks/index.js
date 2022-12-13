import {
  ExampleUseState,
  ClassExampleUseState,
  ExampleUseReducer,
  ExampleUseState0,
  ExampleOfOldStateAndProp,
} from './hooks/useState'
import {
  FriendStatus,
  FriendListItem,
  FriendSelect,
} from './hooks/FriendStatus'
import { Todos } from './hooks/Todos'
import { AppThemeColor } from './hooks/useContext'
import {
  TextInputWithFocusButton,
  MeasureExample,
  MeasureExample2,
} from './hooks/useRef'
import { ExampleUseCallback1, ExampleUseCallback2 } from './hooks/useCallback'
import { ExampleUseImperativeHandle } from './hooks/useImperativeHandle'
import { ExampleUseTransition } from './hooks/useTransition'
import { ExampleUseId } from './hooks/useId'
import { ExampleUseEffect } from './hooks/useEffect'

const friend = {
  id: '1',
  name: '张三',
}

export default function Hooks() {
  return (
    <>
      <ExampleOfOldStateAndProp></ExampleOfOldStateAndProp>
      <ExampleUseState0></ExampleUseState0>
      <ExampleUseState />
      <ClassExampleUseState />
      <ExampleUseReducer />

      <FriendStatus friend={friend}></FriendStatus>
      <FriendListItem friend={friend}></FriendListItem>
      <FriendSelect></FriendSelect>

      <Todos></Todos>

      <AppThemeColor></AppThemeColor>

      <TextInputWithFocusButton></TextInputWithFocusButton>
      <MeasureExample></MeasureExample>
      <MeasureExample2></MeasureExample2>

      <ExampleUseCallback1></ExampleUseCallback1>
      <ExampleUseCallback2></ExampleUseCallback2>

      <ExampleUseImperativeHandle></ExampleUseImperativeHandle>

      <ExampleUseTransition></ExampleUseTransition>

      <ExampleUseId></ExampleUseId>

      <ExampleUseEffect></ExampleUseEffect>
    </>
  )
}
