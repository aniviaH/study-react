import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import App from './App'
import './test-eslint/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
// 我们的render就是这个 只不过我们的性能比较差 我们没有diff算法
function render() {
  root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
  )
}

render()

console.log('root', root)

window.render = render

class TestApp extends React.Component {
  render() {
    return (
      <div className="app">
        <header>header</header>
        <Content />
        <footer>footer</footer>
      </div>
    )
  }
}

class Content extends React.Component {
  render() {
    return (
      <React.Fragment>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </React.Fragment>
    )
  }
}

console.log('TestApp', <TestApp />)
console.log('Content', <Content />)

export default App

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
// tick()
// setInterval(tick, 1000)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
