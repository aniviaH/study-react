import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import App from './App'

import './test-eslint/index'

const root = ReactDOM.createRoot(document.getElementById('root'))

const friend = {
  id: '1',
  name: '张三',
}

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)

const root2 = ReactDOM.createRoot(document.getElementById('root2'))
root2.render(<>hello world!</>)
function tick() {
  const element = (
    <div>
      <div>Hello, world!</div>
      <div>It is {new Date().toLocaleTimeString()}.</div>
    </div>
  )
  root2.render(element)
}
tick()
setInterval(tick, 1000)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
