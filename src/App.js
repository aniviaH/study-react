import React from 'react'
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
  Link,
  RouterProvider,
} from 'react-router-dom'

import './App.css'

import router from './router'

import Home from './views/react-api/Home'
import Hooks from './views/react-api/hooks'
import HooksFaq from './views/react-api/hooks-faq'
import Core from './views/react-api/core'
import Redux from './views/redux'
import UseRefDemo from './views/useRef'
import Render from './views/render'

export default function App(props) {
  // console.log('App---', props)
  return (
    // <RouterProvider router={router}></RouterProvider>
    // <Home />
    <Router>
      <div className="page">
        <nav className="page-link">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/hooks">Hooks</Link>
            </li>
            <li>
              <Link to="/hooks-faq">Hooks-FAQ</Link>
            </li>
            <li>
              <Link to="/core">Core</Link>
            </li>
            <li>
              <Link to="/redux">Redux</Link>
            </li>
            <li>
              <Link to="/useRef">useRef</Link>
            </li>
            <li>
              <Link to="/render">render</Link>
            </li>
          </ul>
        </nav>
        <div className="page-body" style={{ border: '1px solid green' }}>
          <Routes>
            <Route path="/hooks" element={<Hooks />}></Route>
            <Route path="/hooks-faq" element={<HooksFaq />}></Route>
            <Route path="/core" element={<Core />}></Route>
            <Route path="/redux" element={<Redux />}></Route>
            <Route path="/useRef" element={<UseRefDemo />}></Route>
            <Route path="/render" element={<Render />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}
