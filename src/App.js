import logo from './logo.svg';
import './App.css';

import React from 'react'
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import Home from './views/Home'
import About from './views/About'
import User from './views/User'
import Hooks from './views/hooks'
import HooksFaq from './views/hooks-faq'
import Core from './views/core'

export default function App (props) {
  console.log('App---', props);
  return (
    <Router>
      <div>
        {/* 页面链接 */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
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
          </ul>
        </nav>

        <Routes>
          <Route path="/about" element={<About/>}>
          </Route>
          <Route path="/user" element={<User />}>
          </Route>
          <Route path="/hooks" element={<Hooks />}>
          </Route>
          <Route path="/hooks-faq" element={<HooksFaq />}>
          </Route>
          <Route path="/core" element={<Core />}>
          </Route>
          <Route path="/" element={<Home />}>
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

function AppDefault() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

