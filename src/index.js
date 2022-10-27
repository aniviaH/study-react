import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {ExampleUseState, ClassExampleUseState, ExampleUseReducer, ExampleUseState0} from './hooks/useState'
import {FriendStatus, FriendListItem, FriendSelect} from './hooks/FriendStatus'
import {Todos} from './hooks/Todos'
import {AppThemeColor} from './hooks/useContext'
import {TextInputWithFocusButton, MeasureExample, MeasureExample2} from './hooks/useRef'
import {ExampleUseCallback1, ExampleUseCallback2} from './hooks/useCallback'
import {ExampleUseImperativeHandle} from './hooks/useImperativeHandle'
import {ExampleUseTransition} from './hooks/useTransition'
import {ExampleUseId} from './hooks/useId'

import './test-eslint/index'

const root = ReactDOM.createRoot(document.getElementById('root'));

const friend = {
  id: '1',
  name: '张三'
}

root.render(
  // <React.StrictMode>
    // <App />
    <>
      <ExampleUseState0></ExampleUseState0>
      <ExampleUseState/>
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
    </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
