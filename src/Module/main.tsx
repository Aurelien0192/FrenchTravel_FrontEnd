import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from '../Application/App.tsx'
import '../Infrastructure/Style/index.css'


import { MantineProvider } from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
