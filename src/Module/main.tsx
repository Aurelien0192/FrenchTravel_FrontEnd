import React from 'react'
import ReactDOM from 'react-dom/client'
import '../Infrastructure/Style/index.css'


import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { router } from '../Infrastructure/Router/router.tsx'
import { authentificationService } from './Authentification/Authentification.service.ts'
import { AuthentifiateUser } from './Authentification/Authentification.class.ts'

if(sessionStorage.getItem("UserAuthentifiate") !== null){
  const authentifiateUser = sessionStorage.getItem("UserAuthentifiate")
  authentifiateUser &&  authentificationService.updateAuthentifiateUser(AuthentifiateUser.createAuthentifiateUser(JSON.parse(authentifiateUser)))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
