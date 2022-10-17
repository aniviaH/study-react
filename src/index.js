import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {ExampleUseState, ClassExampleUseState} from './hooks/useState'
import {FriendStatus, FriendListItem, FriendSelect} from './hooks/FriendStatus'

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
      <ExampleUseState/>
      <ClassExampleUseState />

      <FriendStatus friend={friend}></FriendStatus>
      <FriendListItem friend={friend}></FriendListItem>
      <FriendSelect></FriendSelect>
    </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
