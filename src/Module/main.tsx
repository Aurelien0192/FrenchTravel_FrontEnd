import React from 'react'
import ReactDOM from 'react-dom/client'
import '../Infrastructure/Style/index.css'


import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { router } from '../Infrastructure/Router/router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
