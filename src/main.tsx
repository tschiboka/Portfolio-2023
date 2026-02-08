import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import router from './routing/routes.tsx'
import './index.scss'
import { AppContextProvider } from './context/AppContext/App.context.tsx'
import { SessionContextProvider } from './context/SessionContext/Session.context.tsx'
import { VersionChecker } from './components/sharedComponents/VersionChecker/VersionChecker.tsx'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <SessionContextProvider>
                <AppContextProvider>
                    <VersionChecker />
                    <RouterProvider router={router} />
                </AppContextProvider>
            </SessionContextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
