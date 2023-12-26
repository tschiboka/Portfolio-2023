import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import router from './routing/routes.tsx'
import './index.scss'
import { AppContextProvider } from './context/AppContext.tsx'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <AppContextProvider>
                <RouterProvider router={router} />
            </AppContextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
