import { createBrowserRouter } from 'react-router-dom'

import ReactApiHome from './../views/react-api/Home'
import Hooks from './../views/react-api/hooks'
import HooksFaq from './../views/react-api/hooks-faq'
import Core from './../views/react-api/core'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ReactApiHome />,
  },
  {
    path: '/react',
    element: <ReactApiHome />,
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
