import React from 'react'
import ReactDOM from 'react-dom/client'
import '../Infrastructure/Style/index.css'


import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { DatesProvider } from '@mantine/dates'
import { router } from '../Infrastructure/Router/router.tsx'
import { authentificationService } from './Authentification/Authentification.service.ts'
import { AuthentifiateUser } from './Authentification/Authentification.class.ts'
import 'dayjs/locale/fr'

import'dayjs/locale/index.d.ts'

if(sessionStorage.getItem("UserAuthentifiate") !== null){
  const authentifiateUser = sessionStorage.getItem("UserAuthentifiate")
  authentifiateUser &&  authentificationService.updateAuthentifiateUser(AuthentifiateUser.createAuthentifiateUser(JSON.parse(authentifiateUser)))
}

if(localStorage.getItem("UserAuthentifiate") !== null){
  const authentifiateUser:string = localStorage.getItem("UserAuthentifiate") as string
  sessionStorage.setItem("UserAuthentifiate",authentifiateUser)
  authentificationService.updateAuthentifiateUser(AuthentifiateUser.createAuthentifiateUser(JSON.parse(authentifiateUser)))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <DatesProvider settings={{locale: 'fr'}}>
        <RouterProvider router={router} />
      </DatesProvider>
    </MantineProvider>
  </React.StrictMode>,
)
