import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom'

import Home from './../views/react-api/Home'
import Hooks from './../views/react-api/hooks'
import HooksFaq from './../views/react-api/hooks-faq'
import Core from './../views/react-api/core'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/react',
    element: <Home />,
    children: [
      {
        path: 'hooks',
        element: <Hooks />,
      },
      {
        path: 'hooks-faq',
        element: <HooksFaq />,
      },
      {
        path: 'core',
        element: <Core />,
      },
    ],
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
])

export default router
