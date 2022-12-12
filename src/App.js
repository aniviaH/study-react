import React from 'react'
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
  Link,
  RouterProvider,
} from 'react-router-dom'

import router from './router'

import Home from './views/react-api/Home'
import Hooks from './views/react-api/hooks'
import HooksFaq from './views/react-api/hooks-faq'
import Core from './views/react-api/core'

export default function App(props) {
  console.log('App---', props)
  return (
    <RouterProvider router={router}></RouterProvider>
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/hooks">Hooks</Link>
    //         </li>
    //         <li>
    //           <Link to="/hooks-faq">Hooks-FAQ</Link>
    //         </li>
    //         <li>
    //           <Link to="/core">Core</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //     <Routes>
    //       <Route path="/hooks" element={<Hooks />}></Route>
    //       <Route path="/hooks-faq" element={<HooksFaq />}></Route>
    //       <Route path="/core" element={<Core />}></Route>
    //       <Route path="/" element={<Home />}></Route>
    //     </Routes>
    //   </div>
    // </Router>
  )
}
